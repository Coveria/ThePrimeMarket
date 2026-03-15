export class CreateUserDto {
  email: string;
  name?: string;
  password: string;
}

export const SafeUserSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};
