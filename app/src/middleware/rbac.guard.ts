// app/src/middlewares/rbac.guard.ts
import { Request, Response, NextFunction } from "express";
import { assertActiveRole } from "../services/rbac.service";



/**
 * Role-Based Access Control (RBAC) Guard
 * --------------------------------------
 * This middleware restricts access to routes based on the user's role.
 *
 * Usage:
 *   router.post("/users", authGuard, requireRoleByName("ADMIN"), controller);
 *
 * Flow:
 *  1. Ensure the user is authenticated and has a role identifier in the request (`role_id` or `role_name`).
 *  2. If a `role_id` is provided, resolve it against the database and validate that the role is active.
 *  3. Optionally, if only `role_name` is provided, also validate the role using the DB (when possible).
 *  4. Compare the resolved role name against the list of allowed roles.
 *  5. If the role is allowed → continue to the next middleware.
 *     Otherwise → return `403 Forbidden`.
 *
 * Error Handling:
 *  - 401 → unauthenticated user or token without a valid role.
 *  - 403 → role is inactive or not authorized for this route.
 *  - 500 → unexpected error inside RBAC service.
 *
 * @param allowedNames - Array of role names that are permitted to access the route.
 * @returns Express middleware function.
 */
export function requireRoleByName(...allowedNames: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check that the user exists in the request (set by auth middleware)
      if (!req.user) return res.status(401).json({ message: "Unauthenticated" });

      // Ensure there is at least a role_id or role_name in the request
      if (req.user.role_id == null && !req.user.role_name) {
        return res.status(401).json({ message: "Invalid token (no role)" });
      }

      // Case 1: Resolve role from database using role_id
      let roleName = req.user.role_name;
      if (!roleName && req.user.role_id != null) {
        const role = await assertActiveRole(req.user.role_id);
        req.role = { id_role: role.id_role, name: role.name, is_active: role.is_active };
        roleName = role.name;
      }

      // Case 2: If role_name is present, also validate against DB if role_id exists
      if (roleName && !req.role && req.user.role_id != null) {
        const role = await assertActiveRole(req.user.role_id);
        roleName = role.name; // normalized and validated
        req.role = { id_role: role.id_role, name: role.name, is_active: role.is_active };
      }

      // Ensure role was resolved
      if (!roleName) return res.status(401).json({ message: "Role not resolved" });

      // Check if the resolved role is in the allowed list
      if (!allowedNames.includes(roleName)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Role authorized → continue
      next();
    } catch (err: any) {
      // Map known RBAC errors to proper HTTP codes
      if (err?.message === "ROLE_NOT_FOUND") return res.status(401).json({ message: "Role not found" });
      if (err?.message === "ROLE_INACTIVE") return res.status(403).json({ message: "Role inactive" });
      return res.status(500).json({ message: "RBAC error" });
    }
  };
}
