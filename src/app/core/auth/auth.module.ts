import { AuthGuardService } from '@auth/application/services/auth.guard.service';
import { AuthBearerService } from '@auth/domain/services/auth.bearer.service';
import { AuthDomainService } from '@auth/domain/services/auth.domain.service';
import { AuthController } from '@auth/application/auth.controller';
import { AuthService } from '@auth/application/auth.service';
import { AuthConfig } from '@/app/app.typings';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '@user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

const AuthGuardProvider = {
  useExisting: AuthGuardService,
  provide: APP_GUARD,
};

@Module({
  controllers: [AuthController],
  providers: [AuthDomainService, AuthBearerService, AuthGuardProvider, AuthGuardService, AuthService],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { jwt } = configService.getOrThrow<AuthConfig>('auth');
        return {
          secret: jwt.secret,
          verifyOptions: {
            audience: jwt.audience,
            issuer: jwt.issuer,
          },
          signOptions: {
            audience: jwt.audience,
            issuer: jwt.issuer,
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
