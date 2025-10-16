import { IsInt, IsOptional } from "class-validator";

/**
 * DTO used to create an order.
 */
export class CreateOrderDto {
  /**
   * ID of the order state.
   */
  @IsInt()
  order_state_id!: number;

  /**
   * ID of the order address.
   */
  @IsInt()
  order_address_id!: number;

  /**
   * ID of the client who made the order.
   */
  @IsInt()
  client_id!: number;

  /**
   * ID of the warehouse fulfilling the order.
   */
  @IsInt()
  warehouse_id!: number;
}

/**
 * DTO used to update an existing order.
 */
export class UpdateOrderDto {
  /**
   * (Optional) New order state ID.
   */
  @IsOptional()
  @IsInt()
  order_state_id?: number;

  /**
   * (Optional) New order address ID.
   */
  @IsOptional()
  @IsInt()
  order_address_id?: number;

  /**
   * (Optional) New client ID.
   */
  @IsOptional()
  @IsInt()
  client_id?: number;

  /**
   * (Optional) New warehouse ID.
   */
  @IsOptional()
  @IsInt()
  warehouse_id?: number;
}

/**
 * Response DTO representing an order.
 */
export class OrderResponseDto {
  /**
   * Unique ID of the order.
   */
  id_order!: number;

  /**
   * ID of the order state.
   */
  order_state_id!: number;

  /**
   * ID of the order address.
   */
  order_address_id!: number;

  /**
   * ID of the client.
   */
  client_id!: number;

  /**
   * ID of the warehouse.
   */
  warehouse_id!: number;
}
