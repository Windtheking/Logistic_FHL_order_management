import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

/**
 * DTO for creating an order address.
 */
export class CreateOrderAddressDto {
  /**
   * Country of the address.
   */
  @IsString()
  country!: string;

  /**
   * Department or state of the address.
   */
  @IsString()
  department!: string;

  /**
   * City of the address.
   */
  @IsString()
  city!: string;

  /**
   * Postal code as an integer.
   */
  @IsInt()
  postal_code!: number;

  /**
   * Street name.
   */
  @IsString()
  street!: string;

  /**
   * House or building number.
   */
  @IsInt()
  number!: number;

  /**
   * Whether the address is active.
   */
  @IsBoolean()
  is_active!: boolean;
}

/**
 * DTO for updating an order address.
 * All fields optional for partial updates.
 */
export class UpdateOrderAddressDto {
  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsInt()
  postal_code?: number;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsInt()
  number?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

/**
 * Order address response DTO.
 */
export class OrderAddressResponseDto {
  id_address!: number;
  country!: string;
  department!: string;
  city!: string;
  postal_code!: number;
  street!: string;
  number!: number;
  is_active!: boolean;
}
