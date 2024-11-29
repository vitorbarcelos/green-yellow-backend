import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { RegisterInterface } from '@auth/application/contracts/auth.input.interface';

export class Register implements RegisterInterface {
  @IsString() @IsNotEmpty() @MaxLength(255) public displayName: string;
  @IsString() @IsNotEmpty() @MaxLength(255) public firstName: string;
  @IsString() @IsNotEmpty() @MaxLength(255) public lastName: string;
  @IsString() @MinLength(12) @MaxLength(32) public password: string;
  @IsString() @IsNotEmpty() @IsPhoneNumber() public phone: string;
  @IsString() @IsNotEmpty() @IsEmail() public email: string;
}
