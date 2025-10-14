/**
 * User Controller
 * -----------------------------------
 * Handles CRUD operations for the User entity using DAO and DTO.
 */

import { Request, Response } from "express";
import * as userDao from "./user.dao";
import { CreateUserDto, UpdateUserDto } from "./user.dto";

/**
 * Create a new user.
 * POST /api/users
 */
export const createUserHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const dto: CreateUserDto = req.body;
    const newUser = await userDao.createUser(dto);
    return res.status(201).json(newUser);
  } catch (err: any) {
    console.error("Error creating user:", err.message);
    return res.status(500).json({ error: "Failed to create user: " + err.message });
  }
};

/**
 * Get all users.
 * GET /api/users
 */
export const getUsersHandler = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await userDao.getUsers();
    return res.json(users);
  } catch (err: any) {
    console.error("Error fetching users:", err.message);
    return res.status(500).json({ error: "Failed to retrieve users." });
  }
};

/**
 * Get user by ID.
 * GET /api/users/:id
 */
export const getUserByIdHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }
    const user = await userDao.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.json(user);
  } catch (err: any) {
    console.error("Error fetching user:", err.message);
    return res.status(500).json({ error: "Failed to retrieve user." });
  }
};

/**
 * Update user.
 * PATCH /api/users/:id
 */
export const updateUserHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }
    const dto: UpdateUserDto = req.body;
    if (Object.keys(dto).length === 0) {
      return res.status(400).json({ error: "At least one field is required for update." });
    }
    const updatedUser = await userDao.updateUser(id, dto);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.json(updatedUser);
  } catch (err: any) {
    console.error("Error updating user:", err.message);
    return res.status(500).json({ error: "Failed to update user." });
  }
};
