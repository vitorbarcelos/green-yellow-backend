import { UserOutput } from '@user/application/contracts/user.output.interface';
import { UserInterface } from '@user/domain/contracts/user.interface';

export interface UserAdapterInterface {
  getUserOutput(user: Optional<UserInterface>): Optional<UserOutput>;
  getManyUserOutput(users: UserInterface[]): UserOutput[];
}
