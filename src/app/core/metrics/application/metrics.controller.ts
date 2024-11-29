import type { UploadMetricsOutputInterface } from '@metrics/application/contracts/metrics.output.interface';
import type { MetricsServiceInterface } from '@metrics/application/contracts/metrics.service.interface';
import { FindAggregatedMetrics } from '@metrics/application/dto/find.aggregated.metrics.dto';
import { ExportMetricsReport } from '@metrics/application/dto/export.metrics.report.dto';
import { UploadMetrics } from '@metrics/application/dto/upload.metrics.dto';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { MetricsService } from '@metrics/application/metrics.service';
import { RoleType } from '@auth/domain/contracts/auth.typings';
import { Role } from '@auth/application/decorators/auth.role';
import { FormDataRequest } from 'nestjs-form-data';
import { Route } from '@/app/utils/route.enum';

@Role(RoleType.Public) // TODO: Replace
@Controller(Route.Metrics)
export class MetricsController {
  @Inject(MetricsService) private readonly metrics: MetricsServiceInterface;

  @Post()
  @FormDataRequest()
  public uploadMetrics(@Body() body: UploadMetrics): Promise<UploadMetricsOutputInterface> {
    return this.metrics.uploadMetrics(body);
  }

  @Get()
  public getMetrics(@Query() params: FindAggregatedMetrics) {
    return this.metrics.getMetrics(params);
  }

  @Get('export')
  public exportMetricsReport(@Query() params: ExportMetricsReport): Promise<any> {
    return this.metrics.exportMetricsReport(params);
  }
}
