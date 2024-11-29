import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoggerService } from '@logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { I18n } from '@/app/utils/i18n.const';
import bcrypt from 'bcryptjs';

@Injectable()
export class CryptoBcryptService {
  @Inject() private readonly configService: ConfigService;
  @Inject() private readonly loggerService: LoggerService;

  public async encrypt(message: string): Promise<string> {
    try {
      const salt = await this.getSalt();
      return bcrypt.hash(message, salt);
    } catch (error: any) {
      this.loggerService.error(error.message, CryptoBcryptService.name);
      throw new InternalServerErrorException(I18n.BcryptEncrypt);
    }
  }

  public isEqual(message: string, hash: string): Promise<boolean> {
    return bcrypt.compare(message, hash);
  }

  private getSalt(): Promise<string> {
    const property: string = 'crypto.bcrypt.rounds';
    const rounds = this.configService.get(property);
    return bcrypt.genSalt(Number(rounds));
  }
}
