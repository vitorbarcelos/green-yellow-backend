import { UserRole } from '@user/domain/contracts/user.typings';

export interface UserOutput {
  updatedAt: Optional<Date>;
  isAdministrator: boolean;
  displayName: string;
  firstName: string;
  isBasic: boolean;
  lastName: string;
  active: boolean;
  createdAt: Date;
  role: UserRole;
  email: string;
  phone: string;
  id: number;
}
