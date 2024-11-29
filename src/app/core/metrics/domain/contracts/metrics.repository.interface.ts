import { CreateMetricsOutputInterface, ExportMetricsReportOutputInterface, FindMetricsOutputInterface } from '@metrics/domain/contracts/metrics.output.interface';
import { ExportMetricsReportInterface, FindMetricsInterface } from '@metrics/domain/contracts/metrics.input.interface';

export interface MetricsRepositoryInterface {
  export(params: ExportMetricsReportInterface): Promise<ExportMetricsReportOutputInterface[]>;
  findAll(params: FindMetricsInterface): AsyncPagination<FindMetricsOutputInterface>;
  save(file: Buffer): Promise<CreateMetricsOutputInterface>;
}
