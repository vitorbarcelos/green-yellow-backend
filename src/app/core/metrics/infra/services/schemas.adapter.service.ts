import { SchemasAdapterInterface } from '@metrics/infra/contracts/schemas.adapter.interface';
import { CreateMetricsInterface } from '@metrics/domain/contracts/metrics.input.interface';
import { MetricsSchema } from '@metrics/infra/schemas/metrics.schema';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { parse } from 'date-fns';

@Injectable()
export class SchemasAdapterService implements SchemasAdapterInterface {
  public getSchemasByMetrics(metrics: CreateMetricsInterface[]): MetricsSchema[] {
    return metrics.map((metric) => {
      const dateTime = parse(metric.dateTime, 'dd/MM/yyyy HH:mm', new Date());
      return plainToInstance(MetricsSchema, {
        metric_id: metric.metricId,
        value: metric.value,
        date_time: dateTime,
        id: 0,
      });
    });
  }
}
