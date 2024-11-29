import { CreateUserInterface, FindUserInterface, UpdateUserInterface } from '@user/domain/contracts/user.input.interface';
import type { UserDomainServiceInterface } from '@user/domain/contracts/user.domain.service.interface';
import type { UserAdapterInterface } from '@user/application/contracts/user.adapter.interface';
import { UserServiceInterface } from '@user/application/contracts/user.service.interface';
import { UserOutput } from '@user/application/contracts/user.output.interface';
import { UserDomainService } from '@user/domain/services/user.domain.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAdapterService } from './services/user.adapter.service';
import { UserRole } from '@user/domain/contracts/user.typings';
import { rejectNils } from '@/app/utils/reject.nils';
import { I18n } from '@/app/utils/i18n.const';

@Injectable()
export class UserService implements UserServiceInterface {
  @Inject(UserDomainService) private readonly user: UserDomainServiceInterface;
  @Inject(UserAdapterService) private readonly adapter: UserAdapterInterface;

  public countByRole(role: UserRole): Promise<number> {
    return this.user.countByRole(role);
  }

  public async findAll(params: FindUserInterface): AsyncPagination<UserOutput> {
    const response = await this.user.findAll(rejectNils(params));
    const users = this.adapter.getManyUserOutput(response.items);
    return Object.assign({}, response, {
      items: users,
    });
  }

  public async findById(id: number): Promise<Optional<UserOutput>> {
    const response = await this.user.findById(id);
    return this.adapter.getUserOutput(response);
  }

  public async create(body: CreateUserInterface): Promise<UserOutput> {
    const response = await this.user.create(body);
    return this.adapter.getUserOutput(response) as UserOutput;
  }

  public async updateById(id: number, body: UpdateUserInterface): Promise<UserOutput> {
    const user = await this.user.findByIdOrThrow(id);
    const response = await this.user.update(user, body);
    return this.adapter.getUserOutput(response) as UserOutput;
  }

  public async deleteById(id: number): Promise<UserOutput> {
    const user = await this.user.findByIdOrThrow(id);
    const response = await this.user.delete(user);
    return this.adapter.getUserOutput(response) as UserOutput;
  }

  public async authenticate(email: string, password: string): Promise<UserOutput> {
    const [_, user] = await this.user.authenticate(email, password);
    if (!user) throw new UnauthorizedException(I18n.UserDivergent);
    return this.adapter.getUserOutput(user) as UserOutput;
  }
}
