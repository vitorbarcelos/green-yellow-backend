import { UserOutput } from '@user/application/contracts/user.output.interface';

export type AuthVerify = [boolean, Optional<UserOutput>];

export enum RoleType {
  UserBasic = 'user-basic',
  UserAdmin = 'user-admin',
  Public = 'public',
  User = 'user',
}
