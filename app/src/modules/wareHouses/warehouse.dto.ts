import { IsOptional, IsString } from "class-validator";

/**
 * DTO for creating a warehouse.
 */
export class CreateWarehouseDto {
  /**
   * Name of the warehouse.
   */
  @IsString()
  warehouse_name!: string;
}

/**
 * DTO for updating a warehouse.
 * All fields optional for partial updates.
 */
export class UpdateWarehouseDto {
  /**
   * Name of the warehouse.
   */
  @IsOptional()
  @IsString()
  warehouse_name?: string;
}

/**
 * Warehouse response DTO.
 */
export class WarehouseResponseDto {
  /**
   * Unique identifier of the warehouse.
   */
  id_warehouse!: number;

  /**
   * Name of the warehouse.
   */
  warehouse_name!: string;
}
