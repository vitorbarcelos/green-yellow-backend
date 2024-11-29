import { MetricsAdapterService } from '@metrics/application/services/metrics.adapter.service';
import { MetricsRepositoryService } from '@metrics/infra/services/metrics.repository.service';
import { SchemasAdapterService } from '@metrics/infra/services/schemas.adapter.service';
import { MetricsDomainService } from '@metrics/domain/services/metrics.domain.service';
import { MetricsController } from '@metrics/application/metrics.controller';
import { MetricsSchema } from '@metrics/infra/schemas/metrics.schema';
import { MetricsService } from '@metrics/application/metrics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MetricsController],
  imports: [TypeOrmModule.forFeature([MetricsSchema])],
  providers: [MetricsRepositoryService, SchemasAdapterService, MetricsAdapterService, MetricsDomainService, MetricsService],
})
export class MetricsModule {}
