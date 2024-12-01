import { AggregatedMetricsOutputInterface, ExportMetricsReportOutputInterface, UploadMetricsOutputInterface } from './contracts/metrics.output.interface';
import { FindAggregatedMetricsInterface, UploadMetricsInterface } from '@metrics/application/contracts/metrics.input.interface';
import type { MetricsDomainServiceInterface } from '@metrics/domain/contracts/metrics.domain.service.interface';
import type { MetricsAdapterInterface } from '@metrics/application/contracts/metrics.adapter.interface';
import { ExportMetricsReportInterface } from '@metrics/application/contracts/metrics.input.interface';
import { MetricsServiceInterface } from '@metrics/application/contracts/metrics.service.interface';
import { MetricsAdapterService } from '@metrics/application/services/metrics.adapter.service';
import { MetricsDomainService } from '@metrics/domain/services/metrics.domain.service';
import { Inject, Injectable } from '@nestjs/common';
import { removeBom } from '@/app/utils/remove.boom';
import { Readable } from 'stream';
import csv from 'csv-parser';

@Injectable()
export class MetricsService implements MetricsServiceInterface {
  @Inject(MetricsDomainService) private readonly metrics: MetricsDomainServiceInterface;
  @Inject(MetricsAdapterService) private readonly adapter: MetricsAdapterInterface;

  public async uploadMetrics(body: UploadMetricsInterface): Promise<UploadMetricsOutputInterface> {
    const isMetricHeaderValid = await this.isMetricHeaderValid(body.file.buffer);
    if (isMetricHeaderValid) return this.metrics.create(body.file.buffer);
    throw new Error('file has an invalid header');
  }

  public async getMetrics(params: FindAggregatedMetricsInterface): AsyncPagination<AggregatedMetricsOutputInterface> {
    const args = this.adapter.toFindMetrics(params);
    const response = await this.metrics.findAll(args);
    const metrics = this.adapter.toAggregatedMetrics(response.items);
    return Object.assign(response, {
      items: metrics,
    });
  }

  public async exportMetricsReport(params: ExportMetricsReportInterface): Promise<ExportMetricsReportOutputInterface> {
    const args = this.adapter.toExportMetrics(params);
    const response = await this.metrics.export(args);
    return this.adapter.toExportedMetrics(response);
  }

  private isMetricHeaderValid(file: Buffer): Promise<boolean> {
    return new Promise((resolve) => {
      const readableStream = new Readable();
      readableStream.push(removeBom(file));
      readableStream.push(null);

      const parser = csv({ separator: ';' });
      const expectedHeaders = ['metricId', 'dateTime', 'value'];
      readableStream
        .pipe(parser)
        .on('headers', (headers: string[]) => {
          const isValid = headers.every((header) => expectedHeaders.includes(header));
          return resolve(isValid);
        })
        .on('end', () => {
          return resolve(false);
        });
    });
  }
}
