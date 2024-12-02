import { createCsvSampleData, MetricsCsvSampleExpected, MetricsCsvSampleInputData } from './metrics.tests.data';
import { MetricsRepositoryService } from '@metrics/infra/services/metrics.repository.service';
import { SchemasAdapterService } from '../infra/services/schemas.adapter.service';
import { MetricsDomainService } from '../domain/services/metrics.domain.service';
import { MetricsController } from '@metrics/application/metrics.controller';
import { MetricsAggregatesType } from '../domain/contracts/metrics.typings';
import { CommonModule } from '@/app/common/common.module';
import { MetricsModule } from '@metrics/metrics.module';
import { Test } from '@nestjs/testing';

describe('MetricsController', () => {
  let metricsController: MetricsController;
  let metricsDomainService: MetricsDomainService;
  let schemasAdapterService: SchemasAdapterService;
  let metricsRepositoryService: MetricsRepositoryService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CommonModule, MetricsModule],
      controllers: [MetricsController],
    }).compile();

    metricsController = moduleRef.get(MetricsController);
    metricsDomainService = moduleRef.get(MetricsDomainService);
    schemasAdapterService = moduleRef.get(SchemasAdapterService);
    metricsRepositoryService = moduleRef.get(MetricsRepositoryService);
    await metricsRepositoryService.deleteAll();
  });

  describe('Upload metrics and find metrics', () => {
    it('Should return the number of uploaded metrics', async () => {
      const file = await createCsvSampleData();
      const response = await metricsController.uploadMetrics({ file });
      expect(response.createdMetrics).toBe(MetricsCsvSampleExpected.createdMetrics);
    });

    it('Should return the metrics aggregated by day', async () => {
      const aggType = MetricsAggregatesType.Day;
      const response = await metricsController.getMetrics({ aggType });
      expect(response.items).toEqual(MetricsCsvSampleExpected.getMetricsByDay);
    });

    it('Should return the metrics aggregated by month', async () => {
      const aggType = MetricsAggregatesType.Month;
      const response = await metricsController.getMetrics({ aggType });
      expect(response.items).toEqual(MetricsCsvSampleExpected.getMetricsByMonth);
    });

    it('Should return the metrics aggregated by year', async () => {
      const aggType = MetricsAggregatesType.Year;
      const response = await metricsController.getMetrics({ aggType });
      expect(response.items).toEqual(MetricsCsvSampleExpected.getMetricsByYear);
    });

    it('Should return the metrics aggregated by day and filtered by metricId', async () => {
      const aggType = MetricsAggregatesType.Day;
      const metricId = MetricsCsvSampleInputData.metricId;
      const response = await metricsController.getMetrics({ aggType, metricId });
      expect(response.items).toEqual(MetricsCsvSampleExpected.getMetricsByDayFilteredByMetricId);
    });

    it('Should return the metrics aggregated by month and filtered by metricId', async () => {
      const aggType = MetricsAggregatesType.Month;
      const metricId = MetricsCsvSampleInputData.metricId;
      const response = await metricsController.getMetrics({ aggType, metricId });
      expect(response.items).toEqual(MetricsCsvSampleExpected.getMetricsByMonthFilteredByMetricId);
    });

    it('Should return the metrics aggregated by year and filtered by metricId', async () => {
      const aggType = MetricsAggregatesType.Year;
      const metricId = MetricsCsvSampleInputData.metricId;
      const response = await metricsController.getMetrics({ aggType, metricId });
      expect(response.items).toEqual(MetricsCsvSampleExpected.getMetricsByYearFilteredByMetricId);
    });

    afterAll(async () => metricsRepositoryService.deleteAll());
  });

  describe('Export metrics', () => {
    beforeAll(async () => {
      const file = await createCsvSampleData();
      const response = await metricsController.uploadMetrics({ file });
      expect(response.createdMetrics).toBe(MetricsCsvSampleExpected.createdMetrics);
    });

    it('Should return the metrics report', async () => {
      const response = await metricsDomainService.export({});
      const metrics = schemasAdapterService.getExportMetricsReportOutput(response);
      expect(metrics).toEqual(MetricsCsvSampleExpected.exportMetrics);
    });

    it('Should return the metrics report filtered by metricId', async () => {
      const metricId = MetricsCsvSampleInputData.metricId;
      const response = await metricsDomainService.export({ metricId });
      const metrics = schemasAdapterService.getExportMetricsReportOutput(response);
      expect(metrics).toEqual(MetricsCsvSampleExpected.exportMetricsFilteredByMetricId);
    });

    afterAll(async () => metricsRepositoryService.deleteAll());
  });
});
