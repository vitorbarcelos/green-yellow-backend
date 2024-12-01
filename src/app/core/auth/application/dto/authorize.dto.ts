import { AuthorizeInterface } from '@auth/application/contracts/auth.input.interface';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Authorize implements AuthorizeInterface {
  @ApiProperty({ description: 'The user\'s password.', required: true, example: 'NJ9jPv_nNoZp', minLength: 12, maxLength: 32 })
  @IsString() @MinLength(12) @MaxLength(32)
  public password: string;

  @ApiProperty({ description: 'The user\'s email address.', required: true, example: 'eduarda.diniz@example.com' })
  @IsString() @IsNotEmpty() @MaxLength(255)
  public email: string;
}
