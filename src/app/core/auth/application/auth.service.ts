import { AuthorizeInterface, RegisterInterface } from '@auth/application/contracts/auth.input.interface';
import type { UserServiceInterface } from '@user/application/contracts/user.service.interface';
import { AuthServiceInterface } from '@auth/application/contracts/auth.service.interface';
import { TokenOutputInterface } from '@auth/application/contracts/auth.output.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from '@user/domain/contracts/user.typings';
import { UserService } from '@user/application/user.service';
import { I18n } from '@/app/utils/i18n.const';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements AuthServiceInterface {
  @Inject(UserService) private readonly user: UserServiceInterface;
  @Inject() private readonly jwt: JwtService;

  public async authorize(body: AuthorizeInterface): Promise<TokenOutputInterface> {
    const user = await this.user.authenticate(body.email, body.password);
    const token = await this.getToken(user.id);
    return {
      token,
    };
  }

  public async register(body: RegisterInterface): Promise<TokenOutputInterface> {
    const user = await this.user.create({ role: UserRole.Basic, ...body });
    const token = await this.getToken(user.id);
    return {
      token,
    };
  }

  public async rootRegister(body: RegisterInterface): Promise<TokenOutputInterface> {
    const count = await this.user.countByRole(UserRole.Admin);
    if (count === 0) {
      const user = await this.user.create({ role: UserRole.Admin, ...body });
      const token = await this.getToken(user.id);
      return {
        token,
      };
    }

    const message = I18n.UserRootCannotRegister;
    throw new NotFoundException(message);
  }

  private getToken(sub: number): Promise<string> {
    return this.jwt.signAsync({
      sub,
    });
  }
}
