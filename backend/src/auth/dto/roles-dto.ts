import { Role } from '@prisma/client';

export interface AuthenticatedUserDto {
  id: number;
  email: string;
  role: Role;
}
