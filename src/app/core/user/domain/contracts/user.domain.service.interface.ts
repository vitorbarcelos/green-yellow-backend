import { CreateUserInterface, FindUserInterface, UpdateUserInterface } from '@user/domain/contracts/user.input.interface';
import { UserAuthenticate, UserRole } from '@user/domain/contracts/user.typings';
import { UserInterface } from '@user/domain/contracts/user.interface';

export interface UserDomainServiceInterface {
  update(user: UserInterface, body: UpdateUserInterface): Promise<UserInterface>;
  authenticate(email: string, password: string): Promise<UserAuthenticate>;
  findAll(params: FindUserInterface): AsyncPagination<UserInterface>;
  create(body: CreateUserInterface): Promise<UserInterface>;
  findById(id: number): Promise<Optional<UserInterface>>;
  delete(user: UserInterface): Promise<UserInterface>;
  findByIdOrThrow(id: number): Promise<UserInterface>;
  countByRole(role: UserRole): Promise<number>;
}
