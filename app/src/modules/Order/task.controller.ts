import { Request, Response } from "express";
import taskDao from "task.dao";


/**
 * Get role actives and inactives
 * GET /api/role
 */
export const getRole = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const role = await roleDao.getRoles();
        return res.json(role);
    } catch (err: any) {
        console.error("Error getting role:", err.message);
        return res.status(500).json({ error: "Failed to retrieve role." });
    }
}
/**
 * Get role active or inactive by id
 * GET /api/role/:id
 */
export const getRoleById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_role = parseInt(req.params.id, 10);
    if (isNaN(id_role)) {
        return res.status(400).json({ error: "Invalid Role ID." });
    }
    const role = await roleDao.getRoleById(id_role);
    
    if (!role) {
      return res.status(404).json({ error: "Role not found." });
    }
    return res.json(role);
  } catch (err: any) {
    console.error("Error getting Role by ID:", err.message);
    return res.status(500).json({ error: "Failed to retrieve role." });
  }
}
