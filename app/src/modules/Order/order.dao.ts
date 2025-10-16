import Order from "./order.models";
import { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from "./order.dto";

/**
 * Creates a new order record.
 * @param data Data necessary to create an order.
 * @returns The created order DTO.
 */
export const createOrder = async (data: CreateOrderDto): Promise<OrderResponseDto> => {
  const entity = await Order.create(data);
  return entity.toJSON() as OrderResponseDto;
};

/**
 * Retrieves all orders.
 * @returns Array of order DTOs.
 */
export const getOrders = async (): Promise<OrderResponseDto[]> => {
  const entities = await Order.findAll();
  return entities.map((e: any) => e.toJSON() as OrderResponseDto);
};

/**
 * Retrieves an order by its ID.
 * @param id The ID of the order.
 * @returns The order DTO or null if not found.
 */
export const getOrderById = async (id: number): Promise<OrderResponseDto | null> => {
  const entity = await Order.findByPk(id);
  return entity ? (entity.toJSON() as OrderResponseDto) : null;
};

/**
 * Updates an existing order.
 * @param id The ID of the order to update.
 * @param data The fields to update.
 * @returns The updated order DTO or null if not found.
 */
export const updateOrder = async (
  id: number,
  data: UpdateOrderDto
): Promise<OrderResponseDto | null> => {
  const entity = await Order.findByPk(id);
  if (!entity) return null;
  await entity.update(data);
  return entity.toJSON() as OrderResponseDto;
};
