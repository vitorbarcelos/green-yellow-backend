import { UserInterface } from '@user/domain/contracts/user.interface';

export type UserAuthenticate = [boolean, Optional<UserInterface>];

export type UserContact = {
  email: string;
  phone: string;
};

export enum UserRole {
  Admin = 'admin',
  Basic = 'basic',
}
