export interface AggregatedMetricsOutputInterface {
  value: number;
  date: string;
}

export interface UploadMetricsOutputInterface {
  createdMetrics: number;
}

export interface ExportMetricsReportOutputInterface {
  file: ArrayBuffer;
  fileName: string;
}
