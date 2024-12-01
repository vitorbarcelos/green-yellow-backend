import { IsEmail, IsOptional, IsPhoneNumber, IsString, Max, MaxLength, Min } from 'class-validator';
import { FindUserInterface } from '@user/domain/contracts/user.input.interface';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindUser implements FindUserInterface {
  @ApiProperty({ description: 'Maximum number of results to return (1-50).', required: false, example: 25 })
  @Transform((params) => Number(params.value)) @Min(1) @Max(50) @IsOptional()
  maxResults?: number;

  @ApiProperty({ description: 'Page number for pagination, starting at 1.', required: false, example: 1 })
  @Transform((params) => Number(params.value)) @Min(1) @IsOptional()
  pageNumber?: number;

  @ApiProperty({ description: 'The display name of the user.', required: false })
  @IsString() @IsOptional() @MaxLength(255)
  public displayName?: string;

  @ApiProperty({ description: 'The first name of the user.', required: false })
  @IsString() @IsOptional() @MaxLength(255)
  public firstName?: string;

  @ApiProperty({ description: 'The last name of the user.', required: false })
  @IsString() @IsOptional() @MaxLength(255)
  public lastName?: string;

  @ApiProperty({ description: 'The phone number of the user.', required: false })
  @IsString() @IsOptional() @IsPhoneNumber('BR')
  public phone?: string;

  @ApiProperty({ description: 'The email address of the user.', required: false })
  @IsString() @IsOptional() @IsEmail()
  public email?: string;
}
