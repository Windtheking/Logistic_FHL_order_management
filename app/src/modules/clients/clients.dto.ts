/**
 * Client DTO
 * -----------
 * This file defines the Data Transfer Objects (DTO) related to the client entity (singular).
 *
 * DTOs are used to:
 *  - Standardize the data exchanged via the API.
 *  - Validate and type data received by controllers.
 *  - Abstract database models and avoid exposing them directly.
 */

import { IsBoolean, IsDateString, IsEmail, IsOptional, IsString } from "class-validator";

/**
 * Data Transfer Object for creating a client record.
 *
 * @property {string} id_card - Client's identification card number.
 * @property {string} client_name - Full name of the client.
 * @property {string} client_email - Email address of the client.
 * @property {string} passwordHash - Password hash.
 * @property {boolean} role_admin - Whether the client has admin role.
 *
 * @example
 * const dto: CreateClientDto = {
 *   id_card: "AB123456",
 *   client_name: "John Doe",
 *   client_email: "john.doe@example.com",
 *   passwordHash: "hashedPassword",
 *   role_admin: false
 * };
 */
export class CreateClientDto {
  @IsString()
  id_card!: string;

  @IsString()
  client_name!: string;

  @IsEmail()
  client_email!: string;

  @IsString()
  passwordHash!: string;

  @IsBoolean()
  role_admin!: boolean;
}

/**
 * Data Transfer Object for updating a client record.
 *
 * Properties are optional for partial updates.
 *
 * @property {string} [id_card] - Updated identification number.
 * @property {string} [client_name] - Updated full name.
 * @property {string} [client_email] - Updated email address.
 * @property {string} [passwordHash] - Updated password hash.
 * @property {boolean} [role_admin] - Updated admin role flag.
 *
 * @example
 * const dto: UpdateClientDto = {
 *   client_name: "Jane Doe",
 *   role_admin: true
 * };
 */
export class UpdateClientDto {
  @IsString()
  @IsOptional()
  id_card?: string;

  @IsString()
  @IsOptional()
  client_name?: string;

  @IsEmail()
  @IsOptional()
  client_email?: string;

  @IsString()
  @IsOptional()
  passwordHash?: string;

  @IsBoolean()
  @IsOptional()
  role_admin?: boolean;
}

/**
 * Data Transfer Object that represents the response of a client record.
 *
 * @property {number} id_client - The unique client identifier.
 * @property {string} id_card - Identification number.
 * @property {string} client_name - Full name.
 * @property {string} client_email - Email address.
 * @property {string} passwordHash - Password hash.
 * @property {boolean} role_admin - Admin role flag.
 * @property {Date} created_at - Timestamp of creation.
 *
 * @example
 * const client: ClientResponseDto = {
 *   id_client: 1,
 *   id_card: "AB123456",
 *   client_name: "John Doe",
 *   client_email: "john.doe@example.com",
 *   passwordHash: "hashedPassword",
 *   role_admin: false,
 *   created_at: new Date()
 * };
 */
export class ClientResponseDto {
  id_client!: number;

  id_card!: string;

  client_name!: string;

  client_email!: string;

  passwordHash!: string;

  role_admin!: boolean;

  @IsDateString()
  created_at!: Date;
}
