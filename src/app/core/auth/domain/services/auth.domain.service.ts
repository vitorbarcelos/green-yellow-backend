import type { AuthBearerServiceInterface } from '@auth/domain/contracts/auth.bearer.service.interface';
import { AuthDomainServiceInterface } from '@auth/domain/contracts/auth.domain.service.interface';
import { UserOutput } from '@user/application/contracts/user.output.interface';
import { AuthBearerService } from '@auth/domain/services/auth.bearer.service';
import { AuthVerify, RoleType } from '@auth/domain/contracts/auth.typings';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { I18n } from '@/app/utils/i18n.const';

@Injectable()
export class AuthDomainService implements AuthDomainServiceInterface {
  @Inject(AuthBearerService) private readonly bearer: AuthBearerServiceInterface;

  public async canActivate(role: RoleType, token: string): Promise<AuthVerify> {
    if (this.publicRole.is(role)) {
      return this.publicRole.verify();
    } else if (this.userRole.is(role)) {
      return this.userRole.verify(token);
    } else if (this.userBasicRole.is(role)) {
      return this.userBasicRole.verify(token);
    } else if (this.userAdminRole.is(role)) {
      return this.userAdminRole.verify(token);
    } else {
      return Promise.resolve([false, undefined]);
    }
  }

  private get publicRole() {
    return {
      is: (role: RoleType) => {
        return role === RoleType.Public;
      },
      verify: (): Promise<AuthVerify> => {
        return Promise.resolve([true, undefined]);
      },
    };
  }

  private get userRole() {
    return {
      is: (role: RoleType) => {
        return role === RoleType.User;
      },
      verify: (token: string): Promise<AuthVerify> => {
        return this.bearer.verify(token, (user: UserOutput) => {
          return [true, user];
        });
      },
    };
  }

  private get userBasicRole() {
    return {
      is: (role: RoleType) => {
        return role === RoleType.UserBasic;
      },
      verify: (token: string): Promise<AuthVerify> => {
        return this.bearer.verify(token, (user: UserOutput) => {
          if (user.isBasic) {
            return [true, user];
          }

          const message = I18n.UserForbidden;
          throw new ForbiddenException(message);
        });
      },
    };
  }

  private get userAdminRole() {
    return {
      is: (role: RoleType) => {
        return role === RoleType.UserAdmin;
      },
      verify: (token: string): Promise<AuthVerify> => {
        return this.bearer.verify(token, (user: UserOutput) => {
          if (user.isAdministrator) {
            return [true, user];
          }

          const message = I18n.UserForbidden;
          throw new ForbiddenException(message);
        });
      },
    };
  }
}
