import { FindUserInterface } from '@user/domain/contracts/user.input.interface';
import { UserRole } from '@user/domain/contracts/user.typings';
import { UserInterface } from './user.interface';

export interface UserRepositoryInterface {
  findAll(params: FindUserInterface): AsyncPagination<UserInterface>;
  findByPhone(phone: string): Promise<Optional<UserInterface>>;
  findByEmail(email: string): Promise<Optional<UserInterface>>;
  findById(id: number): Promise<Optional<UserInterface>>;
  delete(user: UserInterface): Promise<UserInterface>;
  findByIdOrThrow(id: number): Promise<UserInterface>;
  save(user: UserInterface): Promise<UserInterface>;
  countByRole(role: UserRole): Promise<number>;
}
