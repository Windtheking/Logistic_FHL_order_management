// app/src/controllers/user.controller.ts

/**
 * Controlador de Usuarios
 * ------------------------
 * Este archivo contiene los controladores que gestionan las peticiones
 * relacionadas con la entidad `User`. 
 *
 * Patrón utilizado:
 *  - DTO (Data Transfer Object): Para tipar los datos de entrada.
 *  - DAO (Data Access Object): Para abstraer la interacción con la base de datos.
 *
 * Controladores definidos:
 *  - createUser: Crea un nuevo usuario en la base de datos.
 *  - getUsers: Obtiene la lista de todos los usuarios.
 */

import { Request, Response, NextFunction } from "express";
import * as userDao from "./user.repository";
import { CreateUserDto } from "./user.dto";
import { ValidationError, NotFoundError, ConflictError } from "../../core/errors";
import { isEmail, parseIdOrThrow } from "../../core/utils/validator";

/**
 * Obtiene todos los usuarios registrados en la base de datos.
 *
 * @param req - Objeto de solicitud HTTP (no utilizado en este caso).
 * @param res - Objeto de respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware en caso de error.
 *
 * @returns {Promise<Response>} - Devuelve un arreglo con todos los usuarios en formato JSON.
 *
 * @example
 * GET /api/users
 */
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const users = await userDao.getUsers();
    return res.json(users);
  } catch (error: any) {
    return next(error);
  }
};

/**
 * Obtiene un usuario por su ID.
 * 
 * @param req - Objeto de solicitud HTTP, se espera un parámetro de ruta `id`.
 * @param res - Objeto de respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware en caso de error.
 * 
 * @returns {Promise<Response>} - Devuelve el usuario encontrado en formato JSON o un error 404 si no existe.
 * 
 * @example
 * GET /api/users/1
 */
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const id = parseIdOrThrow(req.params.id);
    const user = await userDao.getUserById(id);

    if (!user) throw new NotFoundError("User not found");
    return res.json(user);
  } catch (error: any) {
    return next(error);
  }
};

/**
 * Crea un nuevo usuario en el sistema.
 *
 * @param req - Objeto de solicitud HTTP, se espera un cuerpo con los datos del usuario ({ name, email }).
 * @param res - Objeto de respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware en caso de error.
*
* @returns {Promise<Response>} - Devuelve el usuario creado en formato JSON con código de estado 201.
 *
 * @example
 * POST /api/users
 * {
 *   "name": "Walter Gomez",
 *   "email": "walter@example.com"
 * }
 */
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const dto: CreateUserDto = req.body;

    const errors: Array<{ field: string; message: string }> = [];
    if (!dto?.name) errors.push({ field: "name", message: "is required" });
    if (!dto?.email) errors.push({ field: "email", message: "is required" });

    if (errors.length) throw new ValidationError("Invalids inputs", { errors });

    const user = await userDao.createUser(dto);
    return res.status(201).json(user);
    
  } catch (error: any) {
    return next(error);
  }
};

/**
 * Actualiza un usuario existente.
 * 
 * @param req - Objeto de solicitud HTTP, se espera un parámetro de ruta `id` y un cuerpo con los datos a actualizar ({ name?, email? }).
 * @param res - Objeto de respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware en caso de error.
 * 
 * @returns {Promise<Response>} - Devuelve el usuario actualizado en formato JSON o un error si no se encuentra o hay conflictos.
 * 
 * @example
 * PUT /api/users/1
 * {
 *   "name": "Nuevo Nombre",
 *   "email": "nuevoEmail@example.com"
 * }
 */
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const id = parseIdOrThrow(req.params.id);

    const { name, email } = (req.body ?? {}) as Partial<CreateUserDto>;
    const errors: Array<{ path: string; message: string }> = [];

    if (name == null && email == null) errors.push({ path: "body", message: "send at least one field" });
    if (email != null && !isEmail(email)) errors.push({ path: "email", message: "is not valid" });
    if (errors.length) throw new ValidationError("Invalids inputs", { errors });

    const exists = await userDao.getUserById(id);
    if (!exists) throw new NotFoundError("User not found");

    if (email && (await userDao.emailExistsForOther(email, id))) {
      throw new ConflictError("A user with that email already exists");
    }

    const updated = await userDao.updateUser(id, { name, email });
    return res.json(updated);
  } catch (error: any) {
    return next(error);
  }
};

/**
 * Elimina un usuario por su ID.
 * 
 * @param req - Objeto de solicitud HTTP, se espera un parámetro de ruta `id`.
 * @param res - Objeto de respuesta HTTP.
 * @param next - Función para pasar el control al siguiente middleware en caso de error.
 * 
 * @returns {Promise<Response>} - Devuelve un estado 204 si la eliminación fue exitosa o un error 404 si no se encuentra el usuario.
 * 
 * @example
 * DELETE /api/users/1
 */
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const id = parseIdOrThrow(req.params.id);
    const ok = await userDao.deleteUser(id);

    if (!ok) throw new NotFoundError("User not found");

    return res.status(204).send();
  } catch (error: any) {
    return next(error);
  }
};