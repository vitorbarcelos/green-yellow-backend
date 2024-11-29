import { CreateUserInterface } from '@user/domain/contracts/user.input.interface';
import { UserInterface } from '@user/domain/contracts/user.interface';
import { UserRole } from '@user/domain/contracts/user.typings';
import { instanceToPlain } from 'class-transformer';

export class UserEntity implements UserInterface {
  public readonly updatedAt: Optional<Date>;
  public readonly displayName: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly password: string;
  public readonly active: boolean;
  public readonly createdAt: Date;
  public readonly role: UserRole;
  public readonly email: string;
  public readonly phone: string;
  public readonly id: number;

  public constructor(user: UserInterface) {
    this.displayName = user.displayName;
    this.firstName = user.firstName;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.lastName = user.lastName;
    this.password = user.password;
    this.active = user.active;
    this.email = user.email;
    this.phone = user.phone;
    this.role = user.role;
    this.id = user.id;
  }

  public static create(user: CreateUserInterface) {
    return new UserEntity({
      ...(<UserInterface>user),
      role: user.role ?? UserRole.Basic,
      createdAt: new Date(),
      active: true,
      id: 0,
    });
  }

  public isAdministrator(): boolean {
    const role = UserRole.Admin;
    return this.role === role;
  }

  public isBasic(): boolean {
    const role = UserRole.Basic;
    return this.role === role;
  }

  public isActive(): boolean {
    return this.active && this.id > 0;
  }

  public toPlain(): UserInterface {
    const plain = instanceToPlain(this);
    return <UserInterface>plain;
  }
}
