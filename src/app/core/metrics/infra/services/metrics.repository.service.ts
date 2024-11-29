import { CreateMetricsOutputInterface, ExportMetricsReportOutputInterface, FindMetricsOutputInterface } from '@metrics/domain/contracts/metrics.output.interface';
import { CreateMetricsInterface, ExportMetricsReportInterface, FindMetricsInterface } from '@metrics/domain/contracts/metrics.input.interface';
import { MetricsRepositoryInterface } from '@metrics/domain/contracts/metrics.repository.interface';
import { SchemasAdapterService } from '@metrics/infra/services/schemas.adapter.service';
import { MetricsAggregatesType } from '@metrics/domain/contracts/metrics.typings';
import { MetricsSchema } from '@metrics/infra/schemas/metrics.schema';
import { Inject, Injectable } from '@nestjs/common';
import { removeBom } from '@/app/utils/remove.boom';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Readable } from 'stream';
import csv from 'csv-parser';

@Injectable()
export class MetricsRepositoryService implements MetricsRepositoryInterface {
  @InjectRepository(MetricsSchema) private readonly metricsRepository: Repository<MetricsSchema>;
  @Inject(SchemasAdapterService) private readonly adapter: SchemasAdapterService;
  private readonly defaultBatchSize = 1000;
  private readonly defaultMaxResults = 50;

  public async findAll(params: FindMetricsInterface): AsyncPagination<FindMetricsOutputInterface> {
    const groupBy = this.getGroupByFieldByAggregateType(params.aggregateType);
    const pagination = this.getPaginationOptions(params);
    const conditionals = this.getConditionals(params);

    const queryBuilder = this.metricsRepository.createQueryBuilder('metrics')
      .select([`${groupBy} AS date`, 'SUM(metrics.value) AS value',])
      .groupBy(groupBy)
      .orderBy(groupBy, 'ASC')
      .skip(pagination.offset)
      .take(pagination.maxResults);

    conditionals.forEach(([condition, parameters]) => {
      queryBuilder.andWhere(condition, parameters);
    });

    const [items, count] = await Promise.all([
      queryBuilder.getRawMany(),
      queryBuilder.getCount(),
    ]);

    const metrics = items.map((item: any) => {
      return {
        date: item.date,
        value: Number(item.value),
        aggregateType: params.aggregateType,
        metricId: params.metricId ?? undefined
      }
    });

    const remainder = count % pagination.maxResults;
    const quotient = (count - remainder) / pagination.maxResults;
    const totalPages = quotient + (remainder > 0 ? 1 : 0);

    return {
      pageNumber: totalPages ? pagination.pageNumber + 1 : 1,
      maxResults: pagination.maxResults,
      numResults: metrics.length,
      totalPages: totalPages,
      items: metrics,
    }
  }

  public export(params: ExportMetricsReportInterface): Promise<ExportMetricsReportOutputInterface[]> {
    return Promise.resolve([]);
  }

  public async save(file: Buffer): Promise<CreateMetricsOutputInterface> {
    return this.metricsRepository.manager.transaction(() => {
      return new Promise((resolve) => {
        const readableStream = new Readable();
        readableStream.push(removeBom(file));
        readableStream.push(null);

        const bulk: CreateMetricsInterface[][] = [];
        let batch: CreateMetricsInterface[] = [];
        let length = 0;

        const parser = csv({ separator: ';' });
        readableStream
          .pipe(parser)
          .on('data', (data: CreateMetricsInterface) => {
            batch.push(data);
            length++;

            if (batch.length === this.defaultBatchSize) {
              bulk.push(batch);
              batch = [];
            }
          })
          .on('end', async () => {
            bulk.push(batch);
            batch = [];

            for await (const batch of bulk) {
              const schemas = this.adapter.getSchemasByMetrics(batch);
              await this.metricsRepository.save(schemas);
            }

            return resolve({
              createdMetrics: length,
            });
          });
      });
    });
  }

  private getPaginationOptions(params: FindMetricsInterface) {
    const $maxResults = typeof params.maxResults === 'number' ? params.maxResults : this.defaultMaxResults;
    const maxResults = $maxResults > this.defaultMaxResults ? this.defaultMaxResults : $maxResults;
    const $pageNumber = typeof params.pageNumber === 'number' ? params.pageNumber : 0;
    const offset = $pageNumber * maxResults;
    return {
      pageNumber: $pageNumber,
      maxResults,
      offset,
    };
  }

  private getConditionals(params: FindMetricsInterface): [string, Record<string, any>][] {
    const conditionals: [string, Record<string, any>][] = [];
    if (params.initialDate) conditionals.push(['metrics.date_time::date >= :initialDate', { initialDate: params.initialDate },]);
    if (params.finalDate) conditionals.push(['metrics.date_time::date <= :finalDate', { finalDate: params.finalDate },]);
    if (params.metricId) conditionals.push(['metrics.metric_id = :metricId', { metricId: params.metricId },]);
    return conditionals;
  }

  private getGroupByFieldByAggregateType(aggregateType: MetricsAggregatesType): string {
    switch (aggregateType) {
      case MetricsAggregatesType.Year: {
        return "TO_CHAR(metrics.date_time, 'YYYY')";
      }
      case MetricsAggregatesType.Month: {
        return "TO_CHAR(metrics.date_time, 'YYYY-MM')";
      }
      case MetricsAggregatesType.Day:
      default: {
        return "TO_CHAR(metrics.date_time, 'YYYY-MM-DD')";
      }
    }
  }
}
