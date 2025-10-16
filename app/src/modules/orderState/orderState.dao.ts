import OrderState from "./orderState.models";
import {CreateOrderStateDto,UpdateOrderStateDto,OrderStateResponseDto,} from "./orderState.dto";

/**
 * Creates a new order state record.
 * @param data Data required to create the order state.
 * @returns The newly created order state as a response DTO.
 */
export const createOrderState = async (
  data: CreateOrderStateDto
): Promise<OrderStateResponseDto> => {
  const entity = await OrderState.create(data);
  return entity.toJSON() as OrderStateResponseDto;
};

/**
 * Finds all order states.
 * @returns Array of all order state response DTOs.
 */
export const getOrderStates = async (): Promise<OrderStateResponseDto[]> => {
  const entities = await OrderState.findAll();
  return entities.map((e) => e.toJSON() as OrderStateResponseDto);
};

/**
 * Finds an order state by its ID.
 * @param id The unique identifier of the order state.
 * @returns The order state response DTO or null if not found.
 */
export const getOrderStateById = async (
  id: number
): Promise<OrderStateResponseDto | null> => {
  const entity = await OrderState.findByPk(id);
  return entity ? (entity.toJSON() as OrderStateResponseDto) : null;
};

/**
 * Updates an existing order state record.
 * @param id The ID of the order state to update.
 * @param data The fields to update.
 * @returns The updated order state response DTO or null if not found.
 */
export const updateOrderState = async (
  id: number,
  data: UpdateOrderStateDto
): Promise<OrderStateResponseDto | null> => {
  const entity = await OrderState.findByPk(id);
  if (!entity) return null;
  await entity.update(data);
  return entity.toJSON() as OrderStateResponseDto;
};
