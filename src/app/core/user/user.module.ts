import { UserAdapterService as UserAppAdapterService } from './application/services/user.adapter.service';
import { UserAdapterService as UserInfraAdapterService } from './infra/services/user.adapter.service';
import { UserRepositoryService } from './infra/services/user.repository.service';
import { UserDomainService } from './domain/services/user.domain.service';
import { UserController } from './application/user.controller';
import { UserSchema } from './infra/schemas/user.schema';
import { UserService } from './application/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  exports: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserSchema])],
  providers: [UserInfraAdapterService, UserAppAdapterService, UserRepositoryService, UserDomainService, UserService],
})
export class UserModule {}
