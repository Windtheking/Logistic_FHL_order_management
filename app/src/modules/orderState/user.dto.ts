import { IsEmail, IsInt, IsOptional, IsString, MinLength } from "class-validator";

/**
 * DTO for creating a user.
 */
export class CreateUserDto {
  @IsString()
  username!: string;

  @IsEmail()
  useremail!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

/**
 * DTO for updating a user.
 */
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  useremail?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}

/**
 * User response DTO.
 */
export class UserResponseDto {
  user_id!: number;
  username!: string;
  useremail!: string;
  created_at!: Date;
  updated_at!: Date;
}
