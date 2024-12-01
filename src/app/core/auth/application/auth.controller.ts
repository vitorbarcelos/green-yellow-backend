import type { AuthServiceInterface } from '@auth/application/contracts/auth.service.interface';
import { TokenOutputInterface } from '@auth/application/contracts/auth.output.interface';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Authorize } from '@auth/application/dto/authorize.dto';
import { RoleType } from '@auth/domain/contracts/auth.typings';
import { Role } from '@auth/application/decorators/auth.role';
import { Register } from '@auth/application/dto/register.dto';
import { AuthService } from '@auth/application/auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponses } from './docs/auth.docs';
import { Route } from '@/app/utils/route.enum';

@Role(RoleType.Public)
@Controller(Route.Auth)
export class AuthController {
  @Inject(AuthService) private readonly authService: AuthServiceInterface;

  @Post('register/bootstrap')
  @ApiResponse(AuthResponses.rootRegister.Ok)
  @ApiResponse(AuthResponses.rootRegister.NotFound)
  @ApiOperation({ summary: 'Initial user registration for system setup.' })
  @ApiOperation({ description: 'Available only for the first user to register the system.' })
  public rootRegister(@Body() body: Register): Promise<TokenOutputInterface> {
    return this.authService.rootRegister(body);
  }

  @Post('register')
  @ApiResponse(AuthResponses.register.Ok)
  @ApiOperation({ summary: 'Register a new user.' })
  public register(@Body() body: Register): Promise<TokenOutputInterface> {
    return this.authService.register(body);
  }

  @Post('authorize')
  @ApiResponse(AuthResponses.authorize.Ok)
  @ApiOperation({ summary: 'Authorize user and provide access to the system.' })
  public authorize(@Body() body: Authorize): Promise<TokenOutputInterface> {
    return this.authService.authorize(body);
  }
}
