import { Router } from "express";
import {
  createUserHandler,
  getUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
} from "./orderState.controller";
import { validateDtoMiddleware } from "../../middleware/validate-dto.middleware";
import { CreateUserDto, UpdateUserDto } from "./orderState.dto";

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *           example:
 *             username: johndoe
 *             useremail: johndoe@example.com
 *             password: Password123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", validateDtoMiddleware(CreateUserDto), createUserHandler);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Internal server error
 */
router.get("/", getUsersHandler);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getUserByIdHandler);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *           example:
 *             username: newusername
 *             useremail: newemail@example.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation error or invalid ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", validateDtoMiddleware(UpdateUserDto), updateUserHandler);

export default router;
