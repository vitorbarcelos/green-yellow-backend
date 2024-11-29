import type { AuthorizeInterface, RegisterInterface } from '@auth/application/contracts/auth.input.interface';
import type { AuthServiceInterface } from '@auth/application/contracts/auth.service.interface';
import { TokenOutputInterface } from '@auth/application/contracts/auth.output.interface';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RoleType } from '@auth/domain/contracts/auth.typings';
import { Role } from '@auth/application/decorators/auth.role';
import { AuthService } from '@auth/application/auth.service';
import { Route } from '@/app/utils/route.enum';

@Role(RoleType.Public)
@Controller(Route.Auth)
export class AuthController {
  @Inject(AuthService) private readonly authService: AuthServiceInterface;

  @Post('register/bootstrap')
  public rootRegister(@Body() body: RegisterInterface): Promise<TokenOutputInterface> {
    return this.authService.rootRegister(body);
  }

  @Post('register')
  public register(@Body() body: RegisterInterface): Promise<TokenOutputInterface> {
    return this.authService.register(body);
  }

  @Post('authorize')
  public authorize(@Body() body: AuthorizeInterface): Promise<TokenOutputInterface> {
    return this.authService.authorize(body);
  }
}
