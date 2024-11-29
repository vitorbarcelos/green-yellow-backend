import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from 'class-validator';
import { UpdateUserInterface } from '@user/domain/contracts/user.input.interface';
import { UserRole } from '@user/domain/contracts/user.typings';

export class UpdateUser implements UpdateUserInterface {
  @IsString() @IsNotEmpty() @MaxLength(255) public displayName: string;
  @IsString() @IsNotEmpty() @IsPhoneNumber('BR') public phone: string;
  @IsString() @IsNotEmpty() @MaxLength(255) public firstName: string;
  @IsString() @IsNotEmpty() @MaxLength(255) public lastName: string;
  @IsString() @IsNotEmpty() @IsEmail() public email: string;
  @IsEnum(UserRole) @IsNotEmpty() public role: UserRole;
  @IsBoolean() @IsNotEmpty() public active: boolean;
}

export class UpdateProfileUser implements UpdateUserInterface {
  @IsString() @IsNotEmpty() @MaxLength(255) public displayName: string;
  @IsString() @IsNotEmpty() @IsPhoneNumber('BR') public phone: string;
  @IsString() @IsNotEmpty() @MaxLength(255) public firstName: string;
  @IsString() @IsNotEmpty() @MaxLength(255) public lastName: string;
  @IsString() @IsNotEmpty() @IsEmail() public email: string;
}
