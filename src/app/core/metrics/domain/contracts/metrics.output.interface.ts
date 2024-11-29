import { MetricsAggregatesType } from '@metrics/domain/contracts/metrics.typings';

export interface FindMetricsOutputInterface {
  aggregateType: MetricsAggregatesType;
  metricId?: number;
  value: number;
  date: string;
}

export interface CreateMetricsOutputInterface {
  createdMetrics: number;
}

export interface ExportMetricsReportOutputInterface {
  date: Date;
  metricId: number;
  aggregatedDay: number;
  aggregatedMonth: number;
  aggregatedYear: number;
}
