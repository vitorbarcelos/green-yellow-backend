import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUserInterface } from '@user/domain/contracts/user.input.interface';
import { UserRole } from '@user/domain/contracts/user.typings';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUser implements CreateUserInterface {
  @ApiProperty({ description: 'The display name of the user.', example: 'João' })
  @IsString() @IsNotEmpty() @MaxLength(255)
  public displayName: string;

  @ApiProperty({ description: 'The phone number of the user.', example: '+55 (82) 98888-8888' })
  @IsString() @IsNotEmpty() @IsPhoneNumber('BR')
  public phone: string;

  @ApiProperty({ description: 'The first name of the user.', example: 'João' })
  @IsString() @IsNotEmpty() @MaxLength(255)
  public firstName: string;

  @ApiProperty({ description: 'The last name of the user.', example: 'Gomes' })
  @IsString() @IsNotEmpty() @MaxLength(255)
  public lastName: string;

  @ApiProperty({ description: 'The password of the user.', example: '1k#vt_GJw4oP' })
  @IsString() @MinLength(12) @MaxLength(32)
  public password: string;

  @ApiProperty({ description: 'The email address of the user.', example: 'joao.gomes@example.com' })
  @IsString() @IsNotEmpty() @IsEmail()
  public email: string;

  @ApiProperty({ description: 'The role of the user.', enum: UserRole, example: UserRole.Basic })
  @IsEnum(UserRole) @IsNotEmpty()
  public role: UserRole;
}
