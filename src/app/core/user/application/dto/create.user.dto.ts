import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUserInterface } from '@user/domain/contracts/user.input.interface';
import { UserRole } from '@user/domain/contracts/user.typings';

export class CreateUser implements CreateUserInterface {
  @IsString() @IsNotEmpty() @MaxLength(255) public displayName: string;
  @IsString() @IsNotEmpty() @IsPhoneNumber('BR') public phone: string;
  @IsString() @IsNotEmpty() @MaxLength(255) public firstName: string;
  @IsString() @IsNotEmpty() @MaxLength(255) public lastName: string;
  @IsString() @MinLength(12) @MaxLength(32) public password: string;
  @IsString() @IsNotEmpty() @IsEmail() public email: string;
  @IsEnum(UserRole) @IsNotEmpty() public role: UserRole;
}
