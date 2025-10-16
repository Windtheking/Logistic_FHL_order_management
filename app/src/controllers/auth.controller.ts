/**
 * Auth Controller
 * --------------
 * Handles seller authentication and profile management.
 *
 * Features:
 *  - Seller registration (with strong password and gender validation)
 *  - Seller login (returns JWT and seller with role object)
 *  - Authenticated seller profile retrieval (returns seller and role)
 *
 * All responses and validations follow DTOs and Swagger documentation.
 * Clean code: all data access is in DAO, all responses use DTOs, and role is always included as an object.
 */


// --- Imports ---
import { Request, Response } from "express";
import * as sellerDao from "../modules/clients/clients.dao";
import { hashPassword, comparePassword, validatePasswordStrength } from "../services/password.service";
import { generateToken, verifyToken, extractTokenFromHeader } from "../services/jwt.service";
import { validateRegisterData, validateLoginFields } from "../services/validation.service";
import { RegisterDto, LoginDto, AuthResponseDto, ErrorResponseDto } from "../dto/auth.dto";
import Access from "../models/access.model";



// --- Helpers ---
/**
 * Builds the standard authentication response (token + seller info + message).
 *
 * @param seller - Seller entity
 * @param access - Access entity (must include role)
 * @param message - Response message
 * @returns {AuthResponseDto} - Standardized authentication response (seller includes role object)
 */
function buildAuthResponse({ seller, access }: { seller: any; access: any }, message: string): AuthResponseDto {
  const accessAny = access as any;
  const sellerAny = seller as any;
  return {
    token: generateToken({
      id_seller: sellerAny.id_seller,
      username: accessAny.username,
      role_id: accessAny.role_id
    }),
    seller: ({
      id_seller: sellerAny.id_seller,
      username: accessAny.username,
      fullname: sellerAny.fullname,
      email: sellerAny.email,
      gender: sellerAny.gender ? {
        id_gender: sellerAny.gender.id_gender,
        name: sellerAny.gender.name
      } : undefined,
      role: accessAny.role ? {
        id_role: accessAny.role.id_role,
        name: accessAny.role.name
      } : undefined
    } as any),
    message
  };
}


/**
 * Registers a new seller.
 * Steps:
 *  - Validates registration data (DTO)
 *  - Checks for duplicate username and email
 *  - Validates password strength (strong password required)
 *  - Hashes password
 *  - Creates seller and access records (DAO)
 *  - Returns seller data with role object (no token)
 */
export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const registerData: RegisterDto = req.body;
    const validationError = validateRegisterData(registerData);
    if (validationError) return res.status(400).json(validationError as ErrorResponseDto);

    // Check for duplicate username
    const existingAccess = await sellerDao.findByUsername(registerData.username);
    if (existingAccess) {
      return res.status(409).json({ success: false, message: 'Username already exists' } as ErrorResponseDto);
    }
    // Check for duplicate email
    const existingEmail = await sellerDao.findByEmail(registerData.email);
    if (existingEmail) {
      return res.status(409).json({ success: false, message: 'Email is already registered' } as ErrorResponseDto);
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(registerData.password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Password does not meet security requirements',
        errors: { password: passwordValidation.errors.join('; ') }
      } as ErrorResponseDto);
    }

    // Create access and seller
    const hashedPassword = await hashPassword(registerData.password);
    const { seller, access } = await sellerDao.createSellerWithAccess(registerData, hashedPassword);
    const accessAny = access as any;
    const sellerAny = seller as any;
    return res.status(201).json({
      success: true,
      message: 'Seller registered successfully',
      seller: {
        id_seller: sellerAny.id_seller,
        username: accessAny.username,
        fullname: sellerAny.fullname,
        email: sellerAny.email,
        gender: sellerAny.gender ? {
          id_gender: sellerAny.gender.id_gender,
          name: sellerAny.gender.name
        } : undefined,
        role: accessAny.role ? {
          id_role: accessAny.role.id_role,
          name: accessAny.role.name
        } : undefined
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during registration',
      errors: { server: error instanceof Error ? error.message : 'Unknown error' }
    } as ErrorResponseDto);
  }
};


/**
 * Authenticates a seller (login).
 * Steps:
 *  - Validates login data (DTO)
 *  - Finds access and seller (DAO, includes role)
 *  - Checks status and password
 *  - Returns token and seller data (seller includes role object)
 */
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const loginData: LoginDto = req.body;
    const validationError: any = validateLoginFields(loginData);
    if (validationError) return res.status(400).json(validationError as ErrorResponseDto);

    const access = await sellerDao.findByUsername(loginData.username) as Access & { seller?: any };
    if (!access || !access.seller) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' } as ErrorResponseDto);
    }
    if (!access.is_active) {
      return res.status(403).json({ success: false, message: 'Account is deactivated' } as ErrorResponseDto);
    }
    const isPasswordValid = await comparePassword(loginData.password, access.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' } as ErrorResponseDto);
    }
    return res.status(200).json(buildAuthResponse({ seller: access.seller, access }, 'Login successful'));
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during login',
      errors: { server: error instanceof Error ? error.message : 'Unknown error' }
    } as ErrorResponseDto);
  }
};


/**
 * Retrieves the authenticated seller profile.
 * Steps:
 *  - Extracts and verifies token
 *  - Finds seller by ID (DAO, includes access and role)
 *  - Returns seller profile data including role (no sensitive fields, always as object)
 */
export const getProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization token required' } as ErrorResponseDto);
    }
    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' } as ErrorResponseDto);
    }
    // Ensure the payload contains id_seller
    const sellerId = (payload as any).id_seller;
    if (!sellerId) {
      return res.status(401).json({ success: false, message: 'Invalid token: id_seller not present' } as ErrorResponseDto);
    }
    // Get seller with access and role in one query, cast to any for nested access
    const seller: any = await sellerDao.getSellerWithRoleById(sellerId);
    if (!seller || !seller.access || !seller.access.role || !seller.gender) {
      return res.status(404).json({ success: false, message: 'Seller, role or gender not found' } as ErrorResponseDto);
    }
    const sellerProfile = {
      id_seller: seller.id_seller,
      access_id: seller.access_id,
      fullname: seller.fullname,
      phone: seller.phone ?? undefined,
      email: seller.email,
      birth_date: seller.birth_date,
      gender: seller.gender ? {
        id_gender: seller.gender.id_gender,
        name: seller.gender.name
      } : undefined,
      role: seller.access.role ? {
        id_role: seller.access.role.id_role,
        name: seller.access.role.name
      } : undefined
    };
    return res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: sellerProfile
    });
  } catch (error) {
    console.error('Error retrieving profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving profile',
      errors: { server: error instanceof Error ? error.message : 'Unknown error' }
    } as ErrorResponseDto);
  }
};