import { MetricsModule } from '@metrics/metrics.module';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, UserModule, MetricsModule],
})
export class CoreModule {}
