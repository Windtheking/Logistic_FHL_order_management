import { Router } from 'express';
import { getGender, getGenderById } from '../controllers/gender.controller';
import { authMiddleware } from '../middleware/auth.midleware';
import { requireRoleByName } from '../middleware/rbac.guard';

const router = Router();

/* =========================
 * GENDERS
 * ========================= */

/**
 * @swagger
 * /gender:
 *   get:
 *     summary: Get all genders (active and inactive)
 *     tags: [Genders]
 *     responses:
 *       200:
 *         description: List of genders retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - id_gender: 1
 *                 name: "Male"
 *                 active: true
 *               - id_gender: 2
 *                 name: "Female"
 *                 active: false
 *       500:
 *         description: Failed to retrieve gender
 *         content:
 *           application/json:
 *             example:
 *               error: "Failed to retrieve gender."
 */
router.get("/", authMiddleware(),requireRoleByName('Admin','Seller'),getGender);

/**
 * @swagger
 * /gender/{id}:
 *   get:
 *     summary: Get gender by ID (active or inactive)
 *     tags: [Genders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Gender ID
 *     responses:
 *       200:
 *         description: Gender retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               id_gender: 1
 *               name: "Male"
 *               active: true
 *       400:
 *         description: Invalid Gender ID
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid Gender ID."
 *       404:
 *         description: Gender not found
 *         content:
 *           application/json:
 *             example:
 *               error: "gender not found."
 *       500:
 *         description: Failed to retrieve gender
 *         content:
 *           application/json:
 *             example:
 *               error: "Failed to retrieve gender."
 */
router.get("/:id", authMiddleware(),requireRoleByName('Admin','Seller'),getGenderById);

export default router;