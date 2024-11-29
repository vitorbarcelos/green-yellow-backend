import { CreateMetricsOutputInterface, ExportMetricsReportOutputInterface, FindMetricsOutputInterface } from '@metrics/domain/contracts/metrics.output.interface';
import { ExportMetricsReportInterface, FindMetricsInterface } from '@metrics/domain/contracts/metrics.input.interface';
import { MetricsDomainServiceInterface } from '@metrics/domain/contracts/metrics.domain.service.interface';
import type { MetricsRepositoryInterface } from '@metrics/domain/contracts/metrics.repository.interface';
import { MetricsRepositoryService } from '@metrics/infra/services/metrics.repository.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MetricsDomainService implements MetricsDomainServiceInterface {
  @Inject(MetricsRepositoryService) private readonly metricsRepository: MetricsRepositoryInterface;

  public create(file: Buffer): Promise<CreateMetricsOutputInterface> {
    return this.metricsRepository.save(file);
  }

  public findAll(params: FindMetricsInterface): AsyncPagination<FindMetricsOutputInterface> {
    return this.metricsRepository.findAll(params);
  }

  public export(params: ExportMetricsReportInterface): Promise<ExportMetricsReportOutputInterface[]> {
    return this.metricsRepository.export(params);
  }
}
