import { MemoryStoredFile } from 'nestjs-form-data';
import { Readable } from 'stream';

export const MetricsCsvSampleMetaData = {
  originalName: 'metrics.csv',
  mimetype: 'text/csv',
  encoding: 'utf-8',
};

export const MetricsCsvSampleInputData = {
  metricId: 71412,
};

export const MetricsCsvSampleExpected = {
  createdMetrics: 25,
  getMetricsByDay: [
    {
      value: 21,
      date: '2023-11-22',
    },
    {
      value: 24,
      date: '2023-11-23',
    },
  ],
  getMetricsByMonth: [
    {
      value: 45,
      date: '2023-11',
    },
  ],
  getMetricsByYear: [
    {
      value: 45,
      date: '2023',
    },
  ],
  getMetricsByDayFilteredByMetricId: [
    {
      value: 21,
      date: '2023-11-22',
    },
    {
      value: 11,
      date: '2023-11-23',
    },
  ],
  getMetricsByMonthFilteredByMetricId: [
    {
      value: 32,
      date: '2023-11',
    },
  ],
  getMetricsByYearFilteredByMetricId: [
    {
      value: 32,
      date: '2023',
    },
  ],
  exportMetrics: [
    {
      aggregatedDay: 21,
      aggregatedMonth: 32,
      aggregatedYear: 32,
      date: '22/11/2023',
      metricId: 71412,
    },
    {
      aggregatedDay: 11,
      aggregatedMonth: 32,
      aggregatedYear: 32,
      date: '23/11/2023',
      metricId: 71412,
    },
    {
      aggregatedDay: 13,
      aggregatedMonth: 13,
      aggregatedYear: 13,
      date: '23/11/2023',
      metricId: 71413,
    },
  ],
  exportMetricsFilteredByMetricId: [
    {
      aggregatedDay: 21,
      aggregatedMonth: 32,
      aggregatedYear: 32,
      date: '22/11/2023',
      metricId: 71412,
    },
    {
      aggregatedDay: 11,
      aggregatedMonth: 32,
      aggregatedYear: 32,
      date: '23/11/2023',
      metricId: 71412,
    },
  ],
};

export const MetricsCsvSampleData = `
metricId;dateTime;value
71412;22/11/2023 06:15;1
71412;22/11/2023 06:20;1
71412;22/11/2023 06:25;1
71412;22/11/2023 06:30;3
71412;22/11/2023 06:35;1
71412;22/11/2023 06:40;1
71412;22/11/2023 06:45;4
71413;23/11/2023 06:50;1
71413;23/11/2023 06:55;2
71412;22/11/2023 07:00;1
71413;23/11/2023 07:05;2
71413;23/11/2023 07:10;1
71413;23/11/2023 07:15;5
71413;23/11/2023 07:25;1
71413;23/11/2023 07:30;1
71412;22/11/2023 07:35;0
71412;22/11/2023 07:40;1
71412;22/11/2023 07:45;2
71412;22/11/2023 07:50;1
71412;22/11/2023 07:55;4
71412;23/11/2023 06:15;1
71412;23/11/2023 06:20;2
71412;23/11/2023 06:25;3
71412;23/11/2023 06:30;1
71412;23/11/2023 06:35;4`.trim();

export const createCsvSampleData = async (): Promise<MemoryStoredFile> => {
  const stream = Readable.from(MetricsCsvSampleData);
  return MemoryStoredFile.create(MetricsCsvSampleMetaData, stream, {
    cleanupAfterSuccessHandle: true,
    cleanupAfterFailedHandle: true,
    storage: MemoryStoredFile,
  });
};
