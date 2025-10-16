import Client from "./clients.models";
import { CreateClientDto, UpdateClientDto, ClientResponseDto } from "./clients.dto";

/**
 * Creates a new client record.
 * @param data Data required to create the client.
 * @returns The created client DTO.
 */
export const createClient = async (
  data: CreateClientDto
): Promise<ClientResponseDto> => {
  const entity = await Client.create(data);
  return entity.toJSON() as ClientResponseDto;
};

/**
 * Retrieves all clients.
 * @returns Array of client response DTOs.
 */
export const getClients = async (): Promise<ClientResponseDto[]> => {
  const entities = await Client.findAll();
  return entities.map((e: any) => e.toJSON() as ClientResponseDto);
};

/**
 * Finds a client by ID.
 * @param id Client's unique identifier.
 * @returns Client DTO or null if not found.
 */
export const getClientById = async (
  id: number
): Promise<ClientResponseDto | null> => {
  const entity = await Client.findByPk(id);
  return entity ? (entity.toJSON() as ClientResponseDto) : null;
};

/**
 * Updates an existing client.
 * @param id The ID of the client to update.
 * @param data The fields to update.
 * @returns The updated client DTO or null if not found.
 */
export const updateClient = async (
  id: number,
  data: UpdateClientDto
): Promise<ClientResponseDto | null> => {
  const entity = await Client.findByPk(id);
  if (!entity) return null;
  await entity.update(data);
  return entity.toJSON() as ClientResponseDto;
};
