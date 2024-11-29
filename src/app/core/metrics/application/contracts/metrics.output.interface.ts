export interface AggregatedMetricsOutputInterface {
  value: number;
  date: string;
}

export interface UploadMetricsOutputInterface {
  createdMetrics: number;
}

export interface ExportMetricsReportOutputInterface {
  date: string;
  metricId: number;
  aggMonth: number;
  aggYear: number;
  aggDay: number;
}