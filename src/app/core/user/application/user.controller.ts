import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import type { UserServiceInterface } from '@user/application/contracts/user.service.interface';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserOutput } from '@user/application/contracts/user.output.interface';
import type { UserInterface } from '@user/domain/contracts/user.interface';
import { UpdateProfileUser, UpdateUser } from './dto/update.user.dto';
import { FindUser } from '@user/application/dto/find.user.dto';
import { RoleType } from '@auth/domain/contracts/auth.typings';
import { Role } from '@auth/application/decorators/auth.role';
import { CreateUser } from './dto/create.user.dto';
import { UserResponses } from './docs/user.docs';
import { Route } from '@/app/utils/route.enum';
import { UserService } from './user.service';
import { User } from './decorators/user';

@ApiTags('User')
@ApiBearerAuth()
@Role(RoleType.UserAdmin)
@Controller(Route.User)
export class UserController {
  @Inject(UserService) private readonly userService: UserServiceInterface;

  @Post()
  @ApiResponse(UserResponses.create.Ok)
  @ApiOperation({ summary: 'Create a new user' })
  public create(@Body() body: CreateUser): Promise<UserOutput> {
    return this.userService.create(body);
  }

  @Get()
  @ApiResponse(UserResponses.findAll.Ok)
  @ApiOperation({ summary: 'Get a paginated list of users' })
  public findAll(@Query() params: FindUser): AsyncPagination<UserOutput> {
    return this.userService.findAll(params);
  }

  @Get('profile')
  @Role(RoleType.User)
  @ApiResponse(UserResponses.findProfile.Ok)
  @ApiOperation({ summary: 'Get current user profile' })
  public findProfile(@User() user: UserInterface): Promise<Optional<UserOutput>> {
    return this.userService.findById(user.id);
  }

  @Patch('profile')
  @Role(RoleType.User)
  @ApiResponse(UserResponses.updateProfile.Ok)
  @ApiOperation({ summary: 'Update current user profile' })
  public update(@User() user: UserInterface, @Body() body: UpdateProfileUser): Promise<UserOutput> {
    return this.userService.updateById(user.id, body);
  }

  @Delete('profile')
  @Role(RoleType.User)
  @ApiResponse(UserResponses.deleteProfile.Ok)
  @ApiOperation({ summary: 'Delete current user profile' })
  public delete(@User() user: UserInterface): Promise<UserOutput> {
    return this.userService.deleteById(user.id);
  }

  @Get(':id')
  @ApiResponse(UserResponses.findById.Ok)
  @ApiOperation({ summary: 'Get user details by ID' })
  public findById(@Param('id') id: number): Promise<Optional<UserOutput>> {
    const $id = isNaN(Number(id)) ? 0 : Number(id);
    return this.userService.findById($id);
  }

  @Patch(':id')
  @ApiResponse(UserResponses.updateById.Ok)
  @ApiOperation({ summary: 'Update user details by ID' })
  public updateById(@Param('id') id: number, @Body() body: UpdateUser): Promise<UserOutput> {
    const $id = isNaN(Number(id)) ? 0 : Number(id);
    return this.userService.updateById($id, body);
  }

  @Delete(':id')
  @ApiResponse(UserResponses.deleteById.Ok)
  @ApiOperation({ summary: 'Delete user by ID' })
  public deleteById(@Param('id') id: number): Promise<UserOutput> {
    const $id = isNaN(Number(id)) ? 0 : Number(id);
    return this.userService.deleteById($id);
  }
}
