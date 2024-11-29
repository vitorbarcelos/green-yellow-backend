import { ExportMetricsReportInterface, FindAggregatedMetricsInterface, UploadMetricsInterface } from '@metrics/application/contracts/metrics.input.interface';
import { ExportMetricsReportOutputInterface as DomainExportMetricsReportOutputInterface } from '@metrics/domain/contracts/metrics.output.interface';
import { AggregatedMetricsOutputInterface, ExportMetricsReportOutputInterface } from '@metrics/application/contracts/metrics.output.interface';
import { ExportMetricsReportInterface as DomainExportMetricsReportInterface } from '@metrics/domain/contracts/metrics.input.interface';
import { CreateMetricsInterface, FindMetricsInterface } from '@metrics/domain/contracts/metrics.input.interface';
import { FindMetricsOutputInterface } from '@metrics/domain/contracts/metrics.output.interface';

export interface MetricsAdapterInterface {
  // toCreateMetrics(params: UploadMetricsInterface): CreateMetricsInterface;
  toFindMetrics(params: FindAggregatedMetricsInterface): FindMetricsInterface;
  toExportMetrics(params: ExportMetricsReportInterface): DomainExportMetricsReportInterface;
  toAggregatedMetrics(metrics: FindMetricsOutputInterface[]): AggregatedMetricsOutputInterface[];
  toExportedMetrics(metrics: DomainExportMetricsReportOutputInterface[]): ExportMetricsReportOutputInterface[];
}
