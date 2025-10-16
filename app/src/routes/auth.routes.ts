/**
 * Authentication Routes
 * --------------------
 * This file defines all seller authentication-related routes.
 *
 * RESTful endpoints:
 *  - POST /register: Register a new seller
 *  - POST /login: Seller login (username & password)
 *  - GET /profile: Get authenticated seller's profile
 */

import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new seller
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDto'
 *     responses:
 *       201:
 *         description: Seller registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponseDto'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Validation error"
 *               errors:
 *                 email: "Email is required"
 *       409:
 *         description: Seller or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Username already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Internal server error during registration"
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Seller login (username and password)
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponseDto'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Validation error"
 *               errors:
 *                 username: "Username is required"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Invalid credentials"
 *       403:
 *         description: Account is deactivated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Account is deactivated"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Internal server error during login"
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get authenticated seller's profile
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Profile retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_seller:
 *                       type: integer
 *                       example: 1
 *                     access_id:
 *                       type: integer
 *                       example: 10
 *                     fullname:
 *                       type: string
 *                       example: "David Martinez"
 *                     phone:
 *                       type: string
 *                       example: "+573001112233"
 *                     email:
 *                       type: string
 *                       example: "david@example.com"
 *                     birth_date:
 *                       type: string
 *                       format: date
 *                       example: "1995-05-20"
 *                     gender:
 *                       type: object
 *                       properties:
 *                          id_gender:
 *                             type: integer
 *                             example: 1
 *                          name:
 *                             type: string
 *                             example: "Male"
 *                     role:
 *                       type: object
 *                       properties:
 *                         id_role:
 *                           type: integer
 *                           example: 2
 *                         name:
 *                           type: string
 *                           example: "seller"
 *                       description: "Role object with id_role and name."
 *       401:
 *         description: Authorization token required or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Authorization token required"
 *       404:
 *         description: Seller not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Seller not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseDto'
 *             example:
 *               success: false
 *               message: "Internal server error while retrieving profile"
 */
router.get('/profile', getProfile);

export default router;
