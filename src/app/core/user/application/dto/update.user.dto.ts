import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from 'class-validator';
import { UpdateUserInterface } from '@user/domain/contracts/user.input.interface';
import { UserRole } from '@user/domain/contracts/user.typings';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUser implements UpdateUserInterface {
  @ApiProperty({ description: 'The display name of the user.', example: 'João', required: true })
  @IsString() @IsNotEmpty() @MaxLength(255)
  public displayName: string;

  @ApiProperty({ description: 'The phone number of the user.', example: '+55 (82) 98888-8888', required: true })
  @IsString() @IsNotEmpty() @IsPhoneNumber('BR')
  public phone: string;

  @ApiProperty({ description: 'The first name of the user.', example: 'João', required: true })
  @IsString() @IsNotEmpty() @MaxLength(255)
  public firstName: string;

  @ApiProperty({ description: 'The last name of the user.', example: 'Gomes', required: true })
  @IsString() @IsNotEmpty() @MaxLength(255)
  public lastName: string;

  @ApiProperty({ description: 'The email address of the user.', example: 'joao.gomes@example.com', required: true })
  @IsString() @IsNotEmpty() @IsEmail()
  public email: string;

  @ApiProperty({ description: 'The role of the user.', enum: UserRole, example: UserRole.Admin, required: true })
  @IsEnum(UserRole) @IsNotEmpty()
  public role: UserRole;

  @ApiProperty({ description: 'The active status of the user.', example: true, required: true })
  @IsBoolean() @IsNotEmpty()
  public active: boolean;
}

export class UpdateProfileUser implements UpdateUserInterface {
  @ApiProperty({ description: 'The display name of the user.', example: 'João', required: true })
  @IsString() @IsNotEmpty() @MaxLength(255)
  public displayName: string;

  @ApiProperty({ description: 'The phone number of the user.', example: '+55 (82) 98888-8888', required: true })
  @IsString() @IsNotEmpty() @IsPhoneNumber('BR')
  public phone: string;

  @ApiProperty({ description: 'The first name of the user.', example: 'João', required: true })
  @IsString() @IsNotEmpty() @MaxLength(255)
  public firstName: string;

  @ApiProperty({ description: 'The last name of the user.', example: 'Gomes', required: true })
  @IsString() @IsNotEmpty() @MaxLength(255)
  public lastName: string;

  @ApiProperty({ description: 'The email address of the user.', example: 'joao.gomes@example.com', required: true })
  @IsString() @IsNotEmpty() @IsEmail()
  public email: string;
}
