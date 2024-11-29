import { CryptoBcryptService } from './crypto.bcrypt.service';
import { CryptoService } from './crypto.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  exports: [CryptoService],
  providers: [CryptoBcryptService, CryptoService],
})
export class CryptoModule {}
