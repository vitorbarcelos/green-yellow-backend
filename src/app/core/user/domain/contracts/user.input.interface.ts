import { UserRole } from '@user/domain/contracts/user.typings';

export interface FindUserInterface {
  displayName?: string;
  pageNumber?: number;
  maxResults?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface CreateUserInterface {
  displayName: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  email: string;
  phone: string;
}

export interface UpdateUserInterface {
  displayName: string;
  firstName: string;
  active?: boolean;
  lastName: string;
  role?: UserRole;
  email: string;
  phone: string;
}
