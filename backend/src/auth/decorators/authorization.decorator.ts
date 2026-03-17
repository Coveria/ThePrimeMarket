import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export function Authorization() {
  return applyDecorators(UseGuards(JwtAuthGuard, RolesGuard));
}
