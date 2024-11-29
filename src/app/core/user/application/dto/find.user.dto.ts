import { IsEmail, IsOptional, IsPhoneNumber, IsString, Max, MaxLength, Min } from 'class-validator';
import { FindUserInterface } from '@user/domain/contracts/user.input.interface';
import { Transform } from 'class-transformer';

export class FindUser implements FindUserInterface {
  @Transform((params) => Number(params.value)) @Min(0) @Max(50) @IsOptional() maxResults?: number;
  @Transform((params) => Number(params.value)) @Min(0) @IsOptional() pageNumber?: number;
  @IsString() @IsOptional() @MaxLength(255) public displayName?: string;
  @IsString() @IsOptional() @MaxLength(255) public firstName?: string;
  @IsString() @IsOptional() @MaxLength(255) public lastName?: string;
  @IsString() @IsOptional() @IsPhoneNumber() public phone?: string;
  @IsString() @IsOptional() @IsEmail() public email?: string;
}
