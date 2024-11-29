import { AuthBearerServiceInterface } from '@auth/domain/contracts/auth.bearer.service.interface';
import { TokenPayloadInterface } from '@auth/domain/contracts/auth.token.interface';
import { UserOutput } from '@user/application/contracts/user.output.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthVerify } from '@auth/domain/contracts/auth.typings';
import { UserService } from '@user/application/user.service';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { I18n } from '@/app/utils/i18n.const';
import isBearer from '@/app/utils/is.bearer';
import { isJWT } from 'class-validator';

@Injectable()
export class AuthBearerService implements AuthBearerServiceInterface {
  @Inject() private readonly user: UserService;
  @Inject() private readonly jwt: JwtService;

  public async verify<R = AuthVerify>(bearer: string, callback: (user: UserOutput) => R): Promise<R> {
    const [status, token] = isBearer(bearer);

    if (status) {
      if (isJWT(token)) {
        const payload = await this.jwtVerify(token);
        const user = await this.user.findById(payload.sub);

        if (user) {
          return callback(user);
        }

        const message = I18n.UserUnauthorized;
        throw new UnauthorizedException(message);
      }

      const message = I18n.UserJwtVerify;
      throw new UnauthorizedException(message);
    }

    const message = I18n.UserUnauthorized;
    throw new UnauthorizedException(message);
  }

  private async jwtVerify(token: string): Promise<TokenPayloadInterface> {
    try {
      const payload = await this.jwt.verifyAsync<TokenPayloadInterface>(token);
      return payload as TokenPayloadInterface;
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        const message = I18n.UserJwtExpired;
        throw new UnauthorizedException(message);
      }

      const message = I18n.UserJwtVerify;
      throw new UnauthorizedException(message);
    }
  }
}
