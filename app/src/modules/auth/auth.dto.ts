/**
 * Authentication DTOs
 * -------------------
 * This file defines the Data Transfer Objects (DTO) for authentication operations.
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

/**
 * Data Transfer Object for seller registration.
 *
 * @property {string} username - Unique username for login.
 * @property {string} password - Seller password (will be encrypted).
 * @property {string} fullname - Full name of the seller.
 * @property {string} email - Unique email address of the seller.
 * @property {number} gender_id - Gender ID (foreign key).
 * @property {string} birth_date - Seller's birth date (format: AAAA-MM-DD).
 * @property {string} [phone] - Seller's phone number (optional).
 */
export interface RegisterDto {
  username: string;
  password: string;
  fullname: string;
  email: string;
  gender_id: number;
  birth_date: string; // format: AAAA-MM-DD
  phone?: string;
}

/**
 * Data Transfer Object for user login.
 *
 * @property {string} username - Username for authentication.
 * @property {string} password - User password.
 *
 */
export interface LoginDto {
  username: string;
  password: string;
}

/**
 * Data Transfer Object for authentication response.
 *
 * @property {string} token - JWT token for authenticated requests.
 * @property {object} seller - Seller information without sensitive data.
 * @property {string} message - Success message.
 *
 */
export interface AuthResponseDto {
  token: string;
  message: string;
  seller: {
    id_seller: number;
    username: string;
    fullname: string;
    email: string;
    gender_id: number;
    id_role: number;
  };
}

/**
 * Data Transfer Object for user profile response.
 *
 * @property {number} id_user - Unique user identifier.
 * @property {string} username - Username.
 * @property {string} fullname - Full name of the user.
 * @property {string} email - Email address.
 * @property {string} phone - Phone number.
 * @property {string} birth_date - Birth date in ISO format.
 * @property {number} id_role - Role identifier.
 *
 */
/**
 * Data Transfer Object for seller profile response.
 *
 * @property {number} id_seller - Unique seller identifier.
 * @property {number} access_id - Access ID (foreign key).
 * @property {string} fullname - Full name of the seller.
 * @property {string} [phone] - Seller's phone number (optional).
 * @property {string} email - Email address.
 * @property {string} birth_date - Birth date in ISO format.
 * @property {number} gender_id - Gender ID (foreign key).
 * @property {object} role - Role object with id_role and name.
 */
export interface SellerProfileDto {
  id_seller: number;
  access_id: number;
  fullname: string;
  phone?: string;
  email: string;
  birth_date: string;
  gender_id: number;
  role: {
    id_role: number;
    name: string;
  };
}

/**
 * ErrorResponseDto
 * ----------------
 * TypeScript type for error responses returned by the API.
 *
 * This type matches the ErrorResponseDto schema in Swagger/OpenAPI documentation.
 * It is used for all error responses (validation, authentication, server errors, etc).
 *
 * @property {boolean} success - Always false for error responses.
 * @property {string} message - Human-readable error message.
 * @property {object} [errors] - Optional detailed field errors (e.g., { email: "Email is required" }).
 */
export type ErrorResponseDto = {
  success: false;
  message: string;
  errors?: { [key: string]: string };
}