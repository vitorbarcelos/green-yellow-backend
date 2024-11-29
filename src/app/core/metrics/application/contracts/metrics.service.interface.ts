import { AggregatedMetricsOutputInterface, UploadMetricsOutputInterface } from '@metrics/application/contracts/metrics.output.interface';
import { ExportMetricsReportInterface, UploadMetricsInterface } from '@metrics/application/contracts/metrics.input.interface';
import { FindAggregatedMetricsInterface } from '@metrics/application/contracts/metrics.input.interface';

export interface MetricsServiceInterface {
  getMetrics(params: FindAggregatedMetricsInterface): AsyncPagination<AggregatedMetricsOutputInterface>;
  uploadMetrics(body: UploadMetricsInterface): Promise<UploadMetricsOutputInterface>;
  exportMetricsReport(params: ExportMetricsReportInterface): Promise<any>;
}
