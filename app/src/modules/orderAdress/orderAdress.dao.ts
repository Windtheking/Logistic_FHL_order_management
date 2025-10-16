import OrderAddress from "./orderAdress.models";
import {CreateOrderAddressDto,UpdateOrderAddressDto,OrderAddressResponseDto} from "./orderAdress.dto";

/**
 * Creates a new order address.
 * @param data Information to create an order address.
 * @returns Created order address data transfer object.
 */
export const createOrderAddress = async (
  data: CreateOrderAddressDto
): Promise<OrderAddressResponseDto> => {
  const entity = await OrderAddress.create(data);
  return entity.toJSON() as OrderAddressResponseDto;
};

/**
 * Retrieves all order addresses.
 * @returns List of order address DTOs.
 */
export const getOrderAddresses = async (): Promise<OrderAddressResponseDto[]> => {
  const entities = await OrderAddress.findAll();
  return entities.map((e) => e.toJSON() as OrderAddressResponseDto);
};

/**
 * Retrieves a single order address by ID.
 * @param id Identifier of the order address.
 * @returns Order address DTO or null if nonexistent.
 */
export const getOrderAddressById = async (
  id: number
): Promise<OrderAddressResponseDto | null> => {
  const entity = await OrderAddress.findByPk(id);
  return entity ? (entity.toJSON() as OrderAddressResponseDto) : null;
};

/**
 * Updates an order address by ID.
 * @param id Identifier of the record to update.
 * @param data Fields to update.
 * @returns Updated order address DTO or null if not found.
 */
export const updateOrderAddress = async (
  id: number,
  data: UpdateOrderAddressDto
): Promise<OrderAddressResponseDto | null> => {
  const entity = await OrderAddress.findByPk(id);
  if (!entity) return null;
  await entity.update(data);
  return entity.toJSON() as OrderAddressResponseDto;
};
