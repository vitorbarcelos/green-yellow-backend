import { UserAdapterInterface } from '@user/application/contracts/user.adapter.interface';
import { UserOutput } from '@user/application/contracts/user.output.interface';
import { UserInterface } from '@user/domain/contracts/user.interface';
import { CryptoService } from '@crypto/crypto.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserAdapterService implements UserAdapterInterface {
  @Inject() private readonly crypto: CryptoService;

  public getUserOutput(user: Optional<UserInterface>): Optional<UserOutput> {
    return user ? this.createUserOutput(user) : undefined;
  }

  public getManyUserOutput(users: UserInterface[]): UserOutput[] {
    return users.map(this.createUserOutput);
  }

  private createUserOutput(user: UserInterface): UserOutput {
    return {
      isAdministrator: user.isAdministrator(),
      displayName: user.displayName,
      createdAt: user.createdAt,
      firstName: user.firstName,
      updatedAt: user.updatedAt,
      lastName: user.lastName,
      isBasic: user.isBasic(),
      active: user.active,
      email: user.email,
      phone: user.phone,
      role: user.role,
      id: user.id,
    };
  }
}
