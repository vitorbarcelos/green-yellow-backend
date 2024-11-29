import { UserAdapterService as UserInfraAdapterService } from '@user/infra/services/user.adapter.service';
import { CreateUserInterface, UpdateUserInterface } from '@user/domain/contracts/user.input.interface';
import { UserDomainServiceInterface } from '@user/domain/contracts/user.domain.service.interface';
import { UserServiceInterface } from '@user/application/contracts/user.service.interface';
import { UserAdapterService } from '@user/application/services/user.adapter.service';
import { UserRepositoryService } from '@user/infra/services/user.repository.service';
import { UserOutput } from '@user/application/contracts/user.output.interface';
import { UserDomainService } from '@user/domain/services/user.domain.service';
import { UserController } from '@user/application/user.controller';
import { UserEntity } from '@user/domain/entities/user.entity';
import { UserRole } from '@user/domain/contracts/user.typings';
import { UserSchema } from '@user/infra/schemas/user.schema';
import { UserService } from '@user/application/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CryptoModule } from '@crypto/crypto.module';
import { LoggerModule } from '@logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

describe('UserController', () => {
  let userDomainService: UserDomainServiceInterface;
  let userService: UserServiceInterface;
  let userController: UserController;

  const userDefault: CreateUserInterface = {
    password: 'aryLgTepV11qQdpYbn4Uy',
    email: 'leo.dias@gmail.com',
    phone: '(64) 93814-4245',
    lastName: 'Dias Santos',
    firstName: 'Leonardo',
    role: UserRole.Basic,
    displayName: 'Leon',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      imports: [CryptoModule, LoggerModule.forRoot(), ConfigModule.forRoot({ isGlobal: true })],
      providers: [{ provide: getRepositoryToken(UserSchema), useFactory: jest.fn }, UserInfraAdapterService, UserRepositoryService, UserAdapterService, UserDomainService, UserService],
    }).compile();

    userDomainService = moduleRef.get(UserDomainService);
    userController = moduleRef.get(UserController);
    userService = moduleRef.get(UserService);
  });

  describe('Create an user', () => {
    it('Should return a created user', async () => {
      const createdUser = new UserEntity({
        ...userDefault,
        isAdministrator: () => false,
        createdAt: new Date(),
        isActive: () => true,
        updatedAt: undefined,
        isBasic: () => true,
        active: true,
        id: 1,
      });

      const spy = jest.spyOn(userDomainService, 'create').mockResolvedValue(createdUser);
      const output = await userController.create(userDefault);
      expect(spy).toHaveBeenCalledWith(userDefault);
      expect(output.email).toBe(userDefault.email);
      expect(output.isAdministrator).toBe(false);
      expect(output.role).toBe(UserRole.Basic);
      expect(output).toHaveProperty('createdAt');
      expect(output).toHaveProperty('updatedAt');
      expect(output).toHaveProperty('id');
    });
  });

  describe('Update an user', () => {
    it('Should return a updated user', async () => {
      const userEntity = UserEntity.create(userDefault);

      const userForUpdate: UpdateUserInterface = {
        email: 'eduardo.gomes@gmail.com',
        phone: '(82) 99965-1356',
        lastName: 'Gomes Silva',
        firstName: 'Eduardo',
        role: UserRole.Admin,
        displayName: 'Edu',
      };

      const updatedUser: UserOutput = {
        email: 'eduardo.gomes@gmail.com',
        phone: '(82) 99965-1356',
        lastName: 'Gomes Silva',
        createdAt: new Date(),
        updatedAt: new Date(),
        isAdministrator: true,
        firstName: 'Eduardo',
        role: UserRole.Admin,
        displayName: 'Edu',
        isBasic: false,
        active: true,
        id: 1,
      };

      const spy = jest.spyOn(userService, 'updateById').mockResolvedValue(updatedUser);
      const output = await userController.update(userEntity, userForUpdate);
      expect(spy).toHaveBeenCalledWith(userEntity.id, userForUpdate);
      expect(output.email).not.toBe(userEntity.email);
      expect(output.isAdministrator).toBe(true);
      expect(output.role).toBe(UserRole.Admin);
      expect(output).toHaveProperty('createdAt');
      expect(output).toHaveProperty('updatedAt');
      expect(output).toHaveProperty('id');
    });
  });

  describe('Delete an user', () => {
    it('Should return a deleted user', async () => {
      const userEntity = UserEntity.create(userDefault);

      const deletedUser: UserOutput = {
        ...userDefault,
        isAdministrator: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        isBasic: true,
        active: true,
        id: 1,
      };

      const spy = jest.spyOn(userService, 'deleteById').mockResolvedValue(deletedUser);
      const output = await userController.delete(userEntity);
      expect(spy).toHaveBeenCalledWith(userEntity.id);
      expect(output.email).toBe(userEntity.email);
      expect(output.isAdministrator).toBe(false);
      expect(output.role).toBe(UserRole.Basic);
      expect(output).toHaveProperty('createdAt');
      expect(output).toHaveProperty('updatedAt');
      expect(output).toHaveProperty('id');
    });
  });
});
