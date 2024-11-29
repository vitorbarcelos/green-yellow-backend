import { RoleKey } from '@auth/application/constants/auth.role.key.const';
import { RoleType } from '@auth/domain/contracts/auth.typings';
import { SetMetadata } from '@nestjs/common';

export const Role = (role: RoleType) => {
  return SetMetadata(RoleKey, role);
};
