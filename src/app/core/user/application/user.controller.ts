import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import type { UserServiceInterface } from '@user/application/contracts/user.service.interface';
import { UserOutput } from '@user/application/contracts/user.output.interface';
import type { UserInterface } from '@user/domain/contracts/user.interface';
import { UpdateProfileUser, UpdateUser } from './dto/update.user.dto';
import { FindUser } from '@user/application/dto/find.user.dto';
import { RoleType } from '@auth/domain/contracts/auth.typings';
import { Role } from '@auth/application/decorators/auth.role';
import { CreateUser } from './dto/create.user.dto';
import { Route } from '@/app/utils/route.enum';
import { UserService } from './user.service';
import { User } from './decorators/user';

@Role(RoleType.UserAdmin)
@Controller(Route.User)
export class UserController {
  @Inject(UserService) private readonly userService: UserServiceInterface;

  @Post()
  public create(@Body() body: CreateUser): Promise<UserOutput> {
    return this.userService.create(body);
  }

  @Get()
  public findAll(@Query() params: FindUser): AsyncPagination<UserOutput> {
    return this.userService.findAll(params);
  }

  @Get('profile')
  @Role(RoleType.User)
  public findProfile(@User() user: UserInterface): Promise<Optional<UserOutput>> {
    return this.userService.findById(user.id);
  }

  @Patch('profile')
  @Role(RoleType.User)
  public update(@User() user: UserInterface, @Body() body: UpdateProfileUser): Promise<UserOutput> {
    return this.userService.updateById(user.id, body);
  }

  @Delete('profile')
  @Role(RoleType.User)
  public delete(@User() user: UserInterface): Promise<UserOutput> {
    return this.userService.deleteById(user.id);
  }

  @Get(':id')
  public findById(@Param('id') id: number): Promise<Optional<UserOutput>> {
    const $id = isNaN(Number(id)) ? 0 : Number(id);
    return this.userService.findById($id);
  }

  @Patch(':id')
  public updateById(@Param('id') id: number, @Body() body: UpdateUser): Promise<UserOutput> {
    const $id = isNaN(Number(id)) ? 0 : Number(id);
    return this.userService.updateById($id, body);
  }

  @Delete(':id')
  public deleteById(@Param('id') id: number): Promise<UserOutput> {
    const $id = isNaN(Number(id)) ? 0 : Number(id);
    return this.userService.deleteById($id);
  }
}
