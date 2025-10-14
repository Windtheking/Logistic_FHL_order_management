// app/src/routes/user.routes.ts

/**
 * Rutas de Usuario
 * ----------------
 * Este archivo define las rutas HTTP relacionadas con la entidad `User`.
 * 
 * Endpoints disponibles:
 *  - `POST /users/` : Crear un nuevo usuario.
 *  - `GET /users/`  : Obtener todos los usuarios registrados.
 * 
 * Cada ruta se conecta con su respectivo controlador.
*/

import { Router } from "express";
import { requireAuth, requireRole } from "../auth/auth.midleware";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "./user.controller";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             examples:
 *               demo:
 *                 value:
 *                   - id: 1
 *                     name: "John Doe"
 *                     email: "john.doe@example.com"
 *                     role: "analyst"
 *                   - id: 2
 *                     name: "Jane Doe"
 *                     email: "jane.doe@example.com"
 *                     role: "admin"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       default:
 *         $ref: '#/components/responses/InternalError'
 */
router.get("/", requireAuth, getUsers);

/**
 * GET /:id
 * -----
 * Obtiene un usuario específico por su ID.
 * 
 * Path Parameters:
 *  - `id`: ID del usuario a obtener (requerido)
 * 
 * Response:
 *  - 200 OK: Devuelve el usuario en formato JSON.
 *  - 404 Not Found: Si no se encuentra el usuario con el ID proporcionado.
 *  - 500 Internal Server Error: En caso de error en la consulta.
 * 
 * 
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 * 
 *     security:
 *      - bearerAuth: []
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a obtener
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "Eduardo Camacho"
 *               email: "eduardo@example.com"
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get("/:id", requireAuth, getUserById);

/**
 * POST /
 * -----
 * Create a new user in the database.
 * 
 * Request Body:
 *  - `name`: string (required)
 *  - `email`: string (required, unique)
 *  
 * Response:
 *  - 201 Created: Retorna el usuario creado en formato JSON.
 *  - 500 Internal Server Error: En caso de error en la creación.
 * 
 * 
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 * 
 *     requestBody:
 *       required: true
 * 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Will Smith"
 *               email:
 *                 type: string
 *                 example: "smith@example.com"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               name: "Will Smith"
 *               email: "smith@example.com"
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *  
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 *  
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.post("/", requireAuth, requireRole("admin"),createUser);

/**
 * PUT /:id
 * -----
 * Actualiza un usuario existente en la base de datos.
 * 
 * Path Parameters:
 *  - `id`: ID del usuario a actualizar (requerido)
 * 
 * Request Body:
 *  - `name`: string (opcional)
 *  - `email`: string (opcional, único)
 *  
 * Response:
 *  - 200 OK: Retorna el usuario actualizado en formato JSON.
 *  - 404 Not Found: Si no se encuentra el usuario con el ID proporcionado.
 *  - 500 Internal Server Error: En caso de error en la actualización.
 * 
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nuevo Nombre"
 *               email:
 *                 type: string
 *                 example: "nuevoemail@example.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "Nuevo Nombre"
 *               email: "nuevoemail@example.com"
 *       404:
 *         $ref: '#/components/responses/NotFound'
 * 
 *       409:
 *         $ref: '#/components/responses/Conflict'
 * 
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 * 
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.put("/:id", requireAuth, updateUser);

/**
 * DELETE /:id
 * -----
 * Elimina un usuario existente en la base de datos.
 * 
 * Path Parameters:
 * - `id`: ID del usuario a eliminar (requerido)
 * 
 * Response:
 * - 204 No Content: Si la eliminación fue exitosa.
 * - 404 Not Found: Si no se encuentra el usuario con el ID proporcionado.
 * - 500 Internal Server Error: En caso de error en la eliminación.
 * 
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *         example: 1
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.delete("/:id", requireAuth, requireRole("admin"),deleteUser);

export default router;