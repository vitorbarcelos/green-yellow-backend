import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CoreModule, CommonModule],
})
export class AppModule {}
