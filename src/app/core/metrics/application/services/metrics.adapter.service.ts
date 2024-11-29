import { ExportMetricsReportInterface, FindAggregatedMetricsInterface, UploadMetricsInterface } from '@metrics/application/contracts/metrics.input.interface';
import { ExportMetricsReportInterface as DomainExportMetricsReportInterface } from '@metrics/domain/contracts/metrics.input.interface';
import { ExportMetricsReportOutputInterface, FindMetricsOutputInterface } from '@metrics/domain/contracts/metrics.output.interface';
import { CreateMetricsInterface, FindMetricsInterface } from '@metrics/domain/contracts/metrics.input.interface';
import { AggregatedMetricsOutputInterface } from '@metrics/application/contracts/metrics.output.interface';
import { MetricsAdapterInterface } from '@metrics/application/contracts/metrics.adapter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MetricsAdapterService implements MetricsAdapterInterface {
  public toCreateMetrics(params: UploadMetricsInterface): CreateMetricsInterface {
    // TODO
    return {
      value: 1,
      metricId: 1,
      dateTime: '',
    };
  }

  public toExportedMetrics(metrics: ExportMetricsReportOutputInterface[]): any {
    // TODO
  }

  public toFindMetrics(params: FindAggregatedMetricsInterface): FindMetricsInterface {
    return {
      initialDate: params.dateInitial,
      aggregateType: params.aggType,
      finalDate: params.finalDate,
      metricId: params.metricId,
    };
  }

  public toExportMetrics(params: ExportMetricsReportInterface): DomainExportMetricsReportInterface {
    return {
      initialDate: params.dateInitial,
      finalDate: params.finalDate,
      metricId: params.metricId,
    };
  }

  public toAggregatedMetrics(metrics: FindMetricsOutputInterface[]): AggregatedMetricsOutputInterface[] {
    return metrics.map((metric: FindMetricsOutputInterface) => {
      return {
        value: metric.value,
        date: metric.date,
      };
    });
  }
}
