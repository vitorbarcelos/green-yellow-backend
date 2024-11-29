import { AuthorizeInterface } from '@auth/application/contracts/auth.input.interface';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class Authorize implements AuthorizeInterface {
  @IsString() @MinLength(12) @MaxLength(32) public password: string;
  @IsString() @IsNotEmpty() @MaxLength(255) public email: string;
}
