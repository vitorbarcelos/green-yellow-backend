import { CreateMetricsOutputInterface, DeleteMetricsOutputInterface, ExportMetricsReportOutputInterface, FindMetricsOutputInterface, } from '@metrics/domain/contracts/metrics.output.interface';
import { CreateMetricsInterface, ExportMetricsReportInterface, FindMetricsInterface } from '@metrics/domain/contracts/metrics.input.interface';
import { MetricsRepositoryInterface } from '@metrics/domain/contracts/metrics.repository.interface';
import { SchemasAdapterService } from '@metrics/infra/services/schemas.adapter.service';
import { MetricsAggregatesType } from '@metrics/domain/contracts/metrics.typings';
import { ExportMetricsSQL } from '@metrics/infra/queries/export.metrics';
import { MetricsSchema } from '@metrics/infra/schemas/metrics.schema';
import getPaginationOptions from '@/app/utils/get.pagination.options';
import { QueryBuilder } from '@/app/utils/query.builder';
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

  public async findAll(params: FindMetricsInterface): AsyncPagination<FindMetricsOutputInterface> {
    const column = this.getGroupByColumnByAggregateType(params.aggregateType);
    const conditionals = this.getConditionals(params);
    const pagination = getPaginationOptions(params);

    const columns = [`${column} AS date`, 'SUM(M.value) AS value'];
    const queryBuilder = this.metricsRepository.createQueryBuilder('M').select(columns).groupBy(column).orderBy(column, 'ASC').skip(pagination.offset).take(pagination.maxResults);

    conditionals.forEach(([condition, parameters]) => {
      queryBuilder.andWhere(condition, parameters);
    });

    const countBuilder = queryBuilder.clone().orderBy().skip(undefined).take(undefined);
    const countQuery = `SELECT COUNT(*) FROM (${countBuilder.getSql()})`;
    const countParameters = Object.values(countBuilder.getParameters());

    const [[count], items] = await Promise.all([this.metricsRepository.query(countQuery, countParameters), queryBuilder.getRawMany()]);

    const metrics = items.map((item: any) => {
      return {
        date: item.date,
        value: Number(item.value),
        aggregateType: params.aggregateType,
        metricId: params.metricId ?? undefined,
      };
    });

    const remainder = count.count % pagination.maxResults;
    const quotient = (count.count - remainder) / pagination.maxResults;
    const totalPages = quotient + (remainder > 0 ? 1 : 0);

    return {
      pageNumber: totalPages ? pagination.pageNumber : 1,
      maxResults: pagination.maxResults,
      numResults: metrics.length,
      totalPages: totalPages,
      items: metrics,
    };
  }

  public async deleteAll(): Promise<DeleteMetricsOutputInterface> {
    const response = await this.metricsRepository.delete({});
    const deletedMetrics = Number(response.affected);
    return {
      deletedMetrics
    }
  }

  public async export(params: ExportMetricsReportInterface): Promise<ExportMetricsReportOutputInterface[]> {
    const query = QueryBuilder.buildConditionals(ExportMetricsSQL, this.getConditionals(params));
    return this.metricsRepository.query(query);
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

  private getConditionals(params: FindMetricsInterface | ExportMetricsReportInterface): [string, Record<string, any>][] {
    const conditionals: [string, Record<string, any>][] = [];
    if (params.initialDate) conditionals.push(['"M"."date_time"::date >= :initialDate', { initialDate: params.initialDate }]);
    if (params.finalDate) conditionals.push(['"M"."date_time"::date <= :finalDate', { finalDate: params.finalDate }]);
    if (params.metricId) conditionals.push(['"M"."metric_id" = :metricId', { metricId: params.metricId }]);
    return conditionals;
  }

  private getGroupByColumnByAggregateType(aggregateType: MetricsAggregatesType): string {
    switch (aggregateType) {
      case MetricsAggregatesType.Year: {
        return "TO_CHAR(M.date_time, 'YYYY')";
      }
      case MetricsAggregatesType.Month: {
        return "TO_CHAR(M.date_time, 'YYYY-MM')";
      }
      case MetricsAggregatesType.Day:
      default: {
        return "TO_CHAR(M.date_time, 'YYYY-MM-DD')";
      }
    }
  }
}
