import { IsInt, IsOptional, IsString } from "class-validator";

/**
 * DTO to create an order state.
 */
export class CreateOrderStateDto {
  /**
   * State name or description.
   */
  @IsString()
  state!: string;
}

/**
 * DTO to update an order state.
 * All fields are optional for partial updates.
 */
export class UpdateOrderStateDto {
  /**
   * Optional new state name or description.
   */
  @IsOptional()
  @IsString()
  state?: string;
}

/**
 * DTO representing an order state returned in responses.
 */
export class OrderStateResponseDto {
  /**
   * Identifier of the order state.
   */
  id_state!: number;

  /**
   * State name or description.
   */
  state!: string;

  /**
   * Timestamp when the state was created.
   */
  created_at?: Date;
}