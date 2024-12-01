import { MetricsAggregatesType } from '@metrics/domain/contracts/metrics.typings';
import { MemoryStoredFile } from 'nestjs-form-data';

export interface FindAggregatedMetricsInterface {
  aggType: MetricsAggregatesType;
  pageNumber?: number;
  maxResults?: number;
  dateInitial?: string;
  finalDate?: string;
  metricId?: number;
}

export interface ExportMetricsReportInterface {
  dateInitial?: string;
  finalDate?: string;
  metricId?: number;
}

export interface UploadMetricsInterface {
  file: MemoryStoredFile;
}
