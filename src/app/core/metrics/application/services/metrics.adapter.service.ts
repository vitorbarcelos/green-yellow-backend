import { ExportMetricsReportOutputInterface as DomainExportMetricsReportOutputInterface, FindMetricsOutputInterface } from '@metrics/domain/contracts/metrics.output.interface';
import { AggregatedMetricsOutputInterface, ExportMetricsReportOutputInterface } from '@metrics/application/contracts/metrics.output.interface';
import { ExportMetricsReportInterface as DomainExportMetricsReportInterface } from '@metrics/domain/contracts/metrics.input.interface';
import { ExportMetricsReportInterface, FindAggregatedMetricsInterface } from '@metrics/application/contracts/metrics.input.interface';
import { MetricsAdapterInterface } from '@metrics/application/contracts/metrics.adapter.interface';
import { MetricsExportReportOutputHeader } from '@metrics/domain/contracts/metrics.typings';
import { FindMetricsInterface } from '@metrics/domain/contracts/metrics.input.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ExcelJS from 'exceljs';

@Injectable()
export class MetricsAdapterService implements MetricsAdapterInterface {
  @Inject() private readonly configService: ConfigService;

  public async toExportedMetrics(metrics: DomainExportMetricsReportOutputInterface[]): Promise<ExportMetricsReportOutputInterface> {
    const workbook = new ExcelJS.Workbook();

    workbook.lastModifiedBy = this.configService.getOrThrow('employerName');
    workbook.creator = this.configService.getOrThrow('employerName');
    workbook.modified = new Date();
    workbook.created = new Date();

    const sheet = workbook.addWorksheet('Report');
    sheet.columns = this.getExportReportColumns();
    sheet.addRows(metrics);

    const file = await workbook.xlsx.writeBuffer();
    const fileName = `Report-${Date.now()}.xlsx`;
    return {
      fileName,
      file,
    };
  }

  public toFindMetrics(params: FindAggregatedMetricsInterface): FindMetricsInterface {
    return {
      initialDate: params.dateInitial,
      aggregateType: params.aggType,
      maxResults: params.maxResults,
      pageNumber: params.pageNumber,
      finalDate: params.finalDate,
      metricId: params.metricId,
    };
  }

  public toExportMetrics(params: ExportMetricsReportInterface): DomainExportMetricsReportInterface {
    return {
      initialDate: params.dateInitial,
      finalDate: params.finalDate,
      metricId: params.metricId,
    };
  }

  public toAggregatedMetrics(metrics: FindMetricsOutputInterface[]): AggregatedMetricsOutputInterface[] {
    return metrics.map((metric: FindMetricsOutputInterface) => {
      return {
        value: metric.value,
        date: metric.date,
      };
    });
  }

  private getExportReportColumns() {
    return [
      MetricsExportReportOutputHeader.MetricId,
      MetricsExportReportOutputHeader.Date,
      MetricsExportReportOutputHeader.AggregatedDay,
      MetricsExportReportOutputHeader.AggregatedMonth,
      MetricsExportReportOutputHeader.AggregatedYear,
    ];
  }
}
