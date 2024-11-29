import { FindUserInterface } from '@user/domain/contracts/user.input.interface';
import { UserInterface } from '@user/domain/contracts/user.interface';
import { UserSchema } from '@user/infra/schemas/user.schema';
import { FindOptionsWhere } from 'typeorm';

export interface UserAdapterInterface {
  getSchemaByUser(user: UserInterface): UserSchema;
  getManyUserBySchema(schemas: UserSchema[]): UserInterface[];
  getUserFindOptions<E extends UserSchema>(params: FindUserInterface): FindOptionsWhere<E>[];
  getUserBySchema(schema: Optional<UserSchema>, throwIfNil?: boolean): Optional<UserInterface>;
}
