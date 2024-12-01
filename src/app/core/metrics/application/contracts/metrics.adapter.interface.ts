import { ExportMetricsReportOutputInterface as DomainExportMetricsReportOutputInterface } from '@metrics/domain/contracts/metrics.output.interface';
import { AggregatedMetricsOutputInterface, ExportMetricsReportOutputInterface } from '@metrics/application/contracts/metrics.output.interface';
import { ExportMetricsReportInterface as DomainExportMetricsReportInterface } from '@metrics/domain/contracts/metrics.input.interface';
import { ExportMetricsReportInterface, FindAggregatedMetricsInterface } from '@metrics/application/contracts/metrics.input.interface';
import { FindMetricsOutputInterface } from '@metrics/domain/contracts/metrics.output.interface';
import { FindMetricsInterface } from '@metrics/domain/contracts/metrics.input.interface';

export interface MetricsAdapterInterface {
  toFindMetrics(params: FindAggregatedMetricsInterface): FindMetricsInterface;
  toExportMetrics(params: ExportMetricsReportInterface): DomainExportMetricsReportInterface;
  toAggregatedMetrics(metrics: FindMetricsOutputInterface[]): AggregatedMetricsOutputInterface[];
  toExportedMetrics(metrics: DomainExportMetricsReportOutputInterface[]): Promise<ExportMetricsReportOutputInterface>;
}
