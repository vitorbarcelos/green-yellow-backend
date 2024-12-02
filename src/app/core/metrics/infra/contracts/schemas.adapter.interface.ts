import { ExportMetricsReportOutputInterface } from '@metrics/domain/contracts/metrics.output.interface';
import { CreateMetricsInterface } from '@metrics/domain/contracts/metrics.input.interface';
import { MetricsSchema } from '@metrics/infra/schemas/metrics.schema';

export interface SchemasAdapterInterface {
  getSchemasByMetrics(metrics: CreateMetricsInterface[]): MetricsSchema[];
  getExportMetricsReportOutput(metrics: ExportMetricsReportOutputInterface[]): ExportMetricsReportOutputInterface[];

}
