import { IsInt, IsOptional } from "class-validator";

export class CreateOrderHistoryDto {
  @IsInt()
  client_id!: number;

  @IsInt()
  order_id!: number;
}

export class UpdateOrderHistoryDto {
  @IsOptional()
  @IsInt()
  client_id?: number;

  @IsOptional()
  @IsInt()
  order_id?: number;
}

export class OrderHistoryResponseDto {
  client_id!: number;
  order_id!: number;
  created_at!: Date;
  updated_at!: Date;
}