import orderHistory from "./orderHistory.models";
import {
  CreateOrderHistoryDto,
  UpdateOrderHistoryDto,
  OrderHistoryResponseDto,
} from "./orderHistory.dto";

/**
 * Creates a new order history record.
 * @param data - The data required to create a new order history entry.
 * @returns The created order history as a DTO.
 */
export const createOrderHistory = async (
  data: CreateOrderHistoryDto
): Promise<OrderHistoryResponseDto> => {
  const entity = await orderHistory.create(data);
  return entity.toJSON() as OrderHistoryResponseDto;
};

/**
 * Retrieves all order history records for a given client.
 * @param client_id - The client identifier to filter records.
 * @returns A list of order histories or null if none found.
 */
export const getOrderHistoryByClientId = async (
  client_id: number
): Promise<OrderHistoryResponseDto[] | null> => {
  const entities = await orderHistory.findAll({
    where: { client_id },
  });
  if (!entities.length) return null;
  return entities.map((entity: any) => entity.toJSON() as OrderHistoryResponseDto);
};

/**
 * Retrieves all order history records for a given order.
 * @param order_id - The order identifier to filter records.
 * @returns A list of order histories or null if none found.
 */
export const getOrderHistoryByOrderId = async (
  order_id: number
): Promise<OrderHistoryResponseDto[] | null> => {
  const entities = await orderHistory.findAll({
    where: { order_id },
  });
  if (!entities.length) return null;
  return entities.map((entity: any) => entity.toJSON() as OrderHistoryResponseDto);
};

/**
 * Updates an existing order history record.
 * @param client_id - The client identifier component of the composite key.
 * @param order_id - The order identifier component of the composite key.
 * @param data - Partial data for update.
 * @returns The updated order history DTO or null if not found.
 */
export const updateOrderHistory = async (
  client_id: number,
  order_id: number,
  data: UpdateOrderHistoryDto
): Promise<OrderHistoryResponseDto | null> => {
  const record = await orderHistory.findOne({
    where: { client_id, order_id },
  });
  if (!record) return null;
  await record.update(data);
  return record.toJSON() as OrderHistoryResponseDto;
};