import { UserRepositoryInterface } from '@user/domain/contracts/user.repository.interface';
import type { UserAdapterInterface } from '@user/infra/contracts/user.adapter.interface';
import { FindUserInterface } from '@user/domain/contracts/user.input.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInterface } from '@user/domain/contracts/user.interface';
import { UserRole } from '@user/domain/contracts/user.typings';
import { UserSchema } from '@user/infra/schemas/user.schema';
import { UserAdapterService } from './user.adapter.service';
import { InjectRepository } from '@nestjs/typeorm';
import { I18n } from '@/app/utils/i18n.const';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryService implements UserRepositoryInterface {
  @InjectRepository(UserSchema) private readonly userRepository: Repository<UserSchema>;
  @Inject(UserAdapterService) private readonly adapter: UserAdapterInterface;
  private readonly firstElementIndexOf = 0;
  private readonly defaultMaxResults = 50;

  public countByRole(role: UserRole): Promise<number> {
    return this.userRepository.countBy({ role });
  }

  public async findAll(params: FindUserInterface): AsyncPagination<UserInterface> {
    const options = this.adapter.getUserFindOptions<UserSchema>(params);
    const pagination = this.getPaginationOptions(params);
    const [users, count] = await this.userRepository.findAndCount({
      take: pagination.maxResults,
      skip: pagination.offset,
      where: options,
    });

    const remainder = count % pagination.maxResults;
    const quotient = (count - remainder) / pagination.maxResults;
    const totalPages = quotient + (remainder > 0 ? 1 : 0);

    return {
      pageNumber: totalPages ? pagination.pageNumber : 0,
      items: this.adapter.getManyUserBySchema(users),
      maxResults: pagination.maxResults,
      numResults: users.length,
      totalPages: totalPages,
    };
  }

  public async findById(id: number): Promise<Optional<UserInterface>> {
    const users = await this.userRepository.findBy({ id });
    const user = users.at(this.firstElementIndexOf);
    return this.adapter.getUserBySchema(user, false);
  }

  public async findByEmail(email: string): Promise<Optional<UserInterface>> {
    const users = await this.userRepository.findBy({ email });
    const user = users.at(this.firstElementIndexOf);
    return this.adapter.getUserBySchema(user, false);
  }

  public async findByPhone(phone: string): Promise<Optional<UserInterface>> {
    const users = await this.userRepository.findBy({ phone });
    const user = users.at(this.firstElementIndexOf);
    return this.adapter.getUserBySchema(user, false);
  }

  public async findByIdOrThrow(id: number): Promise<UserInterface> {
    const user = await this.findById(id);
    if (user !== undefined) return user;
    const message = I18n.UserUnauthorized;
    throw new UnauthorizedException(message);
  }

  public async save(user: UserInterface): Promise<UserInterface> {
    const schema = this.adapter.getSchemaByUser(user);
    const $user = await this.userRepository.save(schema);
    return this.adapter.getUserBySchema($user, true) as UserInterface;
  }

  public async delete(user: UserInterface): Promise<UserInterface> {
    const response = await this.userRepository.delete({ id: user.id });
    if (response.affected === 1) return user;
    const message = I18n.UserUnauthorized;
    throw new UnauthorizedException(message);
  }

  private getPaginationOptions(params: FindUserInterface) {
    const $maxResults = typeof params.maxResults === 'number' ? params.maxResults : this.defaultMaxResults;
    const maxResults = $maxResults > this.defaultMaxResults ? this.defaultMaxResults : $maxResults;
    const $pageNumber = typeof params.pageNumber === 'number' ? params.pageNumber : 0;
    const offset = $pageNumber * maxResults;
    return {
      pageNumber: $pageNumber,
      maxResults,
      offset,
    };
  }
}
