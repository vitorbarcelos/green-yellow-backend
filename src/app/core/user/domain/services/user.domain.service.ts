import { CreateUserInterface, FindUserInterface, UpdateUserInterface } from '@user/domain/contracts/user.input.interface';
import { UserDomainServiceInterface } from '@user/domain/contracts/user.domain.service.interface';
import type { UserRepositoryInterface } from '@user/domain/contracts/user.repository.interface';
import { UserAuthenticate, UserContact, UserRole } from '@user/domain/contracts/user.typings';
import { UserRepositoryService } from '@user/infra/services/user.repository.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserInterface } from '@user/domain/contracts/user.interface';
import { UserEntity } from '@user/domain/entities/user.entity';
import { CryptoService } from '@crypto/crypto.service';
import { I18n } from '@/app/utils/i18n.const';

@Injectable()
export class UserDomainService implements UserDomainServiceInterface {
  @Inject(UserRepositoryService) private readonly userRepository: UserRepositoryInterface;
  @Inject() private readonly crypto: CryptoService;

  public countByRole(role: UserRole): Promise<number> {
    return this.userRepository.countByRole(role);
  }

  public findAll(params: FindUserInterface): AsyncPagination<UserInterface> {
    return this.userRepository.findAll(params);
  }

  public findById(id: number): Promise<Optional<UserInterface>> {
    return this.userRepository.findById(id);
  }

  public findByIdOrThrow(id: number): Promise<UserInterface> {
    return this.userRepository.findByIdOrThrow(id);
  }

  public delete(user: UserInterface): Promise<UserInterface> {
    return this.userRepository.delete(user);
  }

  public async create(body: CreateUserInterface): Promise<UserInterface> {
    return this.verifyDuplicates(body).then(async () => {
      const password = await this.crypto.bcrypt.encrypt(body.password);
      const $body = Object.assign({}, body, { password });
      const user = UserEntity.create($body);
      return this.userRepository.save(user);
    });
  }

  public async update(user: UserInterface, body: UpdateUserInterface): Promise<UserInterface> {
    return this.verifyDuplicates(body, user.id).then(async () => {
      const $body = Object.assign({}, user, body, {
        role: this.getUserRole(user, body),
        updatedAt: new Date(),
      });

      return this.userRepository.save($body);
    });
  }

  public async authenticate(email: string, password: string): Promise<UserAuthenticate> {
    const user = await this.userRepository.findByEmail(email);

    if (user?.isActive()) {
      const status = await this.crypto.bcrypt.isEqual(password, user.password);
      const $user = status ? user : undefined;
      return [status, $user];
    }

    return [false, undefined];
  }

  private async verifyDuplicates(body: UserContact, identifier?: number): Promise<void> {
    const users = await Promise.all([this.userRepository.findByEmail(body.email), this.userRepository.findByPhone(body.phone)]);

    const messages: string[] = [I18n.UserEmailDuplicate, I18n.UserPhoneDuplicate];

    for (let index = 0; index < users.length; index++) {
      const message = messages.at(index);
      const user = users.at(index);

      if (user) {
        if (!identifier) {
          throw new BadRequestException(message);
        }

        if ('id' in user && user.id !== identifier) {
          throw new BadRequestException(message);
        }
      }
    }
  }

  private getUserRole(user: UserInterface, body: UpdateUserInterface): string {
    if (user.isAdministrator()) {
      if (typeof body.role === 'string') {
        return body.role;
      }
    }

    return user.role;
  }
}
