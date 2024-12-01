import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { RegisterInterface } from '@auth/application/contracts/auth.input.interface';
import { ApiProperty } from '@nestjs/swagger';

export class Register implements RegisterInterface {
  @ApiProperty({ description: 'The display name of the user.', required: true, example: 'Edu' })
  @IsString() @IsNotEmpty() @MaxLength(255)
  public displayName: string;

  @ApiProperty({ description: 'The first name of the user.', required: true, example: 'Eduarda' })
  @IsString() @IsNotEmpty() @MaxLength(255)
  public firstName: string;

  @ApiProperty({ description: 'The last name of the user.', required: true, example: 'Diniz' })
  @IsString() @IsNotEmpty() @MaxLength(255)
  public lastName: string;

  @ApiProperty({ description: 'The password of the user.', required: true, example: 'NJ9jPv_nNoZp', minLength: 12, maxLength: 32 })
  @IsString() @MinLength(12) @MaxLength(32)
  public password: string;

  @ApiProperty({ description: 'The phone number of the user.', required: true, example: '+55 (82) 99999-9999' })
  @IsString() @IsNotEmpty() @IsPhoneNumber('BR')
  public phone: string;

  @ApiProperty({ description: 'The email address of the user.', required: true, example: 'eduarda.diniz@example.com' })
  @IsString() @IsNotEmpty() @IsEmail()
  public email: string;
}
