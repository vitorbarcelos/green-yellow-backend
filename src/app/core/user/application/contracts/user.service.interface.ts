import { CreateUserInterface, FindUserInterface, UpdateUserInterface } from '@user/domain/contracts/user.input.interface';
import { UserOutput } from '@user/application/contracts/user.output.interface';
import { UserRole } from '@user/domain/contracts/user.typings';

export interface UserServiceInterface {
  updateById(id: number, body: UpdateUserInterface): Promise<UserOutput>;
  authenticate(email: string, password: string): Promise<UserOutput>;
  findAll(params: FindUserInterface): AsyncPagination<UserOutput>;
  create(body: CreateUserInterface): Promise<UserOutput>;
  findById(id: number): Promise<Optional<UserOutput>>;
  deleteById(id: number): Promise<UserOutput>;
  countByRole(role: UserRole): Promise<number>;
}
