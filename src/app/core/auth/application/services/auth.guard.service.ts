import type { AuthDomainServiceInterface } from '@auth/domain/contracts/auth.domain.service.interface';
import { AuthDomainService } from '@auth/domain/services/auth.domain.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RoleKey } from '@auth/application/constants/auth.role.key.const';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { RoleType } from '@auth/domain/contracts/auth.typings';
import { I18n } from '@/app/utils/i18n.const';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthGuardService implements CanActivate {
  @Inject(AuthDomainService) private readonly user: AuthDomainServiceInterface;
  @Inject() private readonly reflector: Reflector;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const role = this.reflector.getAllAndOverride<RoleType>(RoleKey, [ctx.getHandler(), ctx.getClass()]);

    if (!role) {
      const message = I18n.RouteInRelease;
      throw new UnauthorizedException(message);
    }

    const request = ctx.switchToHttp().getRequest<Request>();
    const token = request.headers?.authorization ?? String();
    const [status, user] = await this.user.canActivate(role, token);
    if (user) request.user = user;
    return status;
  }
}
