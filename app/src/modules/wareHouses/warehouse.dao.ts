import Warehouse from "../models/warehouses.model";
import {
  CreateWarehouseDto,
  UpdateWarehouseDto,
  WarehouseResponseDto,
} from "../dto/warehouses.dto";

/**
 * Creates a new warehouse record.
 * @param data Warehouse creation data.
 * @returns Created warehouse DTO.
 */
export const createWarehouse = async (
  data: CreateWarehouseDto
): Promise<WarehouseResponseDto> => {
  const entity = await Warehouse.create(data);
  return entity.toJSON() as WarehouseResponseDto;
};

/**
 * Retrieves all warehouses.
 * @returns Array of warehouse response DTOs.
 */
export const getWarehouses = async (): Promise<WarehouseResponseDto[]> => {
  const entities = await Warehouse.findAll();
  return entities.map((e) => e.toJSON() as WarehouseResponseDto);
};

/**
 * Retrieves a warehouse by its ID.
 * @param id Warehouse ID.
 * @returns Warehouse DTO or null if not found.
 */
export const getWarehouseById = async (
  id: number
): Promise<WarehouseResponseDto | null> => {
  const entity = await Warehouse.findByPk(id);
  return entity ? (entity.toJSON() as WarehouseResponseDto) : null;
};

/**
 * Updates a warehouse record.
 * @param id Warehouse ID.
 * @param data Data fields to update.
 * @returns Updated warehouse DTO or null if not found.
 */
export const updateWarehouse = async (
  id: number,
  data: UpdateWarehouseDto
): Promise<WarehouseResponseDto | null> => {
  const entity = await Warehouse.findByPk(id);
  if (!entity) return null;
  await entity.update(data);
  return entity.toJSON() as WarehouseResponseDto;
};
