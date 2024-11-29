import { CryptoBcryptService } from './crypto.bcrypt.service';
import { Inject, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class CryptoService {
  @Inject() public readonly bcrypt: CryptoBcryptService;

  public get hash() {
    return {
      tiny(size: number = 21): string {
        return nanoid(size);
      },
    };
  }
}
