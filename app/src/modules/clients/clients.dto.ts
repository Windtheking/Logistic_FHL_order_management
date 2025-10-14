/**
 * Access DTO
 * ------------
 * This file defines the Data Transfer Objects (DTO) related to the access entity (singular).
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

import { IsBoolean, IsDate, IsDateString, IsIn, IsInt, IsOptional, IsString } from "class-validator";

/**
 * Data Transfer Object for creating an access record.
 * @property {number} role_id - id to identify the rol
 * @property {string} username - Username for login.
 * @property {string} password - Password (should be hashed before storing).
 * @property {boolean} [is_active] - Whether the access is active (optional, defaults to true).
 *
 * @example
 * const dto: CreateAccessDto = {
 *   username: "admin",
 *   password: "hashedPassword123",
 *   is_active: true
 * };
 */

export class CreateAccessDto {
  @IsInt()
  role_id!: number;

  @IsString()
  username!: string;

  @IsString()
  password!: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}


/**
 * Data Transfer Object for updating an access record.
 *
 * @property {string} [username] - Updated username.
 * @property {string} [password] - Updated password (hashed).
 * @property {boolean} [is_active] - Whether the access is active.
 *
 * @example
 * const dto: UpdateAccessDto = {
 *   password: "newHashedPassword",
 *   is_active: false
 * };
 */

export class UpdateAccessDto {
  @IsInt()
  @IsOptional()
  role_id?: number;
  
  @IsString()
  @IsOptional()
  username?: string;
  
  @IsString()
  @IsOptional()
  password?: string;
  
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;


}


/**
 * Data Transfer Object that represents the response of an access record.
 *
 * @property {number} id_access - Unique identifier of the access record.
 * @property {string} username - Username for login.
 * @property {boolean} is_active - Whether the access is active.
 * @property {Date} createdAt - Timestamp when the record was created.
 * @property {Date} updatedAt - Timestamp when the record was last updated.
 *
 * @example
 * const access: AccessResponseDto = {
 *   id_access: 1,
 *   username: "admin",
 *   is_active: true,
 *   createdAt: new Date(),
 *   updatedAt: new Date()
 * };
 */

export class AccessResponseDto {
  @IsInt()
  id_access!: number;

  @IsInt()
  role_id!: number;

  @IsString()
  username!: string;

  @IsBoolean()
  is_active!: boolean;

  @IsDateString()
  createdAt!: Date;
  
  @IsDateString()
  updatedAt!: Date;
}