// src/modules/auth/auth.routes.ts
import { Router } from "express";
import { login, register, me } from "../../modules/auth/auth.controller";
import { requireAuth } from "../../modules/auth/auth.midleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: JWT based authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/AuthRegisterRequest' }
 *           examples:
 *             default:
 *               value:
 *                 name: "Eduardo Pertuz"
 *                 email: "eduardo@example.com"
 *                 password: "contrasena123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 *       default:
 *         $ref: '#/components/responses/InternalError'
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and token generation
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/AuthLoginRequest' }
 *           examples:
 *             default:
 *               value:
 *                 email: "eduardo@example.com"
 *                 password: "contrasena123"
 *     responses:
 *       200:
 *         description: Token generated successfully
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AuthLoginResponse' }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 * 
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 * 
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get authenticated user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user profile
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/MeResponse' }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 * 
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get("/me", requireAuth, me);

export default router;
