import { UserRole } from './user.typings';

export interface UserInterface {
  readonly updatedAt: Optional<Date>;
  readonly displayName: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
  readonly active: boolean;
  readonly createdAt: Date;
  readonly role: UserRole;
  readonly email: string;
  readonly phone: string;
  readonly id: number;

  isAdministrator(): boolean;
  isActive(): boolean;
  isBasic(): boolean;
}
