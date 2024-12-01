export enum MetricsAggregatesType {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}
export const MetricsExportReportOutputHeader = {
  Date: {
    key: 'date',
    header: 'DateTime',
  },
  MetricId: {
    key: 'metricId',
    header: 'MetricId',
  },
  AggregatedDay: {
    key: 'aggregatedDay',
    header: 'AggDay',
  },
  AggregatedMonth: {
    key: 'aggregatedMonth',
    header: 'AggMonth',
  },
  AggregatedYear: {
    key: 'aggregatedYear',
    header: 'AggYear',
  },
};
