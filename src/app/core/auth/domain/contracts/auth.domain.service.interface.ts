import { AuthVerify, RoleType } from '@auth/domain/contracts/auth.typings';

export interface AuthDomainServiceInterface {
  canActivate(role: RoleType, token: string): Promise<AuthVerify>;
}
