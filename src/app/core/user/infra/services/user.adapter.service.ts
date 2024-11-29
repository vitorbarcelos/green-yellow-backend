import { UserAdapterInterface } from '@user/infra/contracts/user.adapter.interface';
import { Injectable, InternalServerErrorException as Error } from '@nestjs/common';
import { FindUserInterface } from '@user/domain/contracts/user.input.interface';
import { UserInterface } from '@user/domain/contracts/user.interface';
import { UserEntity } from '@user/domain/entities/user.entity';
import { UserSchema } from '@user/infra/schemas/user.schema';
import { isPagination } from '@/app/utils/is.pagination';
import { plainToInstance } from 'class-transformer';
import { Like, FindOptionsWhere } from 'typeorm';
import { I18n } from '@/app/utils/i18n.const';

@Injectable()
export class UserAdapterService implements UserAdapterInterface {
  public getUserFindOptions<E extends UserSchema>(params: FindUserInterface): FindOptionsWhere<E>[] {
    return <FindOptionsWhere<E>[]>Object.entries(params)
      .filter(([key, value]) => !isPagination(key))
      .reduce((accumulator, [key, value]) => {
        let operation = { [key]: Like(`%${value}%`) };
        return [...accumulator, operation];
      }, []);
  }

  public getUserBySchema(schema: Optional<UserSchema>, throwIfNil?: boolean): Optional<UserInterface> {
    if (schema) return this.createUserBySchema(schema);
    if (throwIfNil) throw new Error(I18n.UserSchema);
    return undefined;
  }

  public getManyUserBySchema(schemas: UserSchema[]): UserInterface[] {
    return schemas.map(this.createUserBySchema);
  }

  public getSchemaByUser(user: UserInterface): UserSchema {
    return plainToInstance(UserSchema, {
      displayName: user.displayName,
      firstName: user.firstName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastName: user.lastName,
      password: user.password,
      active: user.active,
      email: user.email,
      phone: user.phone,
      role: user.role,
      id: user.id,
    });
  }

  private createUserBySchema(schema: UserSchema): UserInterface {
    return new UserEntity(<UserInterface>{
      displayName: schema.displayName,
      firstName: schema.firstName,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      lastName: schema.lastName,
      password: schema.password,
      active: schema.active,
      email: schema.email,
      phone: schema.phone,
      role: schema.role,
      id: schema.id,
    });
  }
}
