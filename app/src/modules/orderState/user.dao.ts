import User from "./orderState.models";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "./user.dto";

/**
 * Create a new user record.
 */
export const createUser = async (data: CreateUserDto): Promise<UserResponseDto> => {
  const user = await User.create(data);
  return user.toJSON() as UserResponseDto;
};

/**
 * Get all users in the database.
 */
export const getUsers = async (): Promise<UserResponseDto[]> => {
  const users = await User.findAll();
  return users.map((u: any) => u.toJSON() as UserResponseDto);
};

/**
 * Get a user by ID.
 */
export const getUserById = async (id: number): Promise<UserResponseDto | null> => {
  const user = await User.findByPk(id);
  return user ? (user.toJSON() as UserResponseDto) : null;
};

/**
 * Update user data by ID.
 */
export const updateUser = async (
  id: number,
  data: UpdateUserDto
): Promise<UserResponseDto | null> => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.update(data);
  return user.toJSON() as UserResponseDto;
};
