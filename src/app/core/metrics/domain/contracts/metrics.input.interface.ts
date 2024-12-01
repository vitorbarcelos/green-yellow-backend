import { MetricsAggregatesType } from '@metrics/domain/contracts/metrics.typings';

export interface FindMetricsInterface {
  aggregateType: MetricsAggregatesType;
  pageNumber?: number;
  maxResults?: number;
  initialDate?: string;
  finalDate?: string;
  metricId?: number;
}

export interface CreateMetricsInterface {
  metricId: number;
  dateTime: string;
  value: number;
}

export interface ExportMetricsReportInterface {
  initialDate?: string;
  finalDate?: string;
  metricId?: number;
}
