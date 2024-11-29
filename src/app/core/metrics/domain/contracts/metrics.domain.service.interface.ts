import { CreateMetricsOutputInterface, ExportMetricsReportOutputInterface, FindMetricsOutputInterface } from '@metrics/domain/contracts/metrics.output.interface';
import { ExportMetricsReportInterface, FindMetricsInterface } from '@metrics/domain/contracts/metrics.input.interface';

export interface MetricsDomainServiceInterface {
  create(file: Buffer): Promise<CreateMetricsOutputInterface>;
  findAll(params: FindMetricsInterface): AsyncPagination<FindMetricsOutputInterface>;
  export(body: ExportMetricsReportInterface): Promise<ExportMetricsReportOutputInterface[]>;
}
