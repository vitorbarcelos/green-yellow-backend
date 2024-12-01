import type { UploadMetricsOutputInterface } from '@metrics/application/contracts/metrics.output.interface';
import type { MetricsServiceInterface } from '@metrics/application/contracts/metrics.service.interface';
import { ApiOperation, ApiTags, ApiConsumes, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FindAggregatedMetrics } from '@metrics/application/dto/find.aggregated.metrics.dto';
import { ExportMetricsReport } from '@metrics/application/dto/export.metrics.report.dto';
import { Body, Controller, Get, Inject, Post, Query, Res } from '@nestjs/common';
import { UploadMetrics } from '@metrics/application/dto/upload.metrics.dto';
import { MetricsService } from '@metrics/application/metrics.service';
import { RoleType } from '@auth/domain/contracts/auth.typings';
import { Role } from '@auth/application/decorators/auth.role';
import { MetricsResponses } from './docs/metrics.docs';
import { FormDataRequest } from 'nestjs-form-data';
import { Route } from '@/app/utils/route.enum';
import type { Response } from 'express';

@ApiTags('Metrics')
@ApiBearerAuth()
@Role(RoleType.UserAdmin)
@Controller(Route.Metrics)
export class MetricsController {
  @Inject(MetricsService) private readonly metrics: MetricsServiceInterface;

  @Get()
  @Role(RoleType.User)
  @ApiResponse(MetricsResponses.getMetrics.Ok)
  @ApiOperation({ summary: 'Get Metrics' })
  public getMetrics(@Query() params: FindAggregatedMetrics) {
    return this.metrics.getMetrics(params);
  }

  @Post()
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  @ApiResponse(MetricsResponses.uploadMetrics.Ok)
  @ApiOperation({ summary: 'Upload Metrics' })
  public uploadMetrics(@Body() body: UploadMetrics): Promise<UploadMetricsOutputInterface> {
    return this.metrics.uploadMetrics(body);
  }

  @Get('export')
  @ApiOperation({ summary: 'Export Metrics' })
  @ApiResponse(MetricsResponses.exportMetricsReport.Ok)
  public async exportMetricsReport(@Query() params: ExportMetricsReport, @Res() response: Response) {
    const report = await this.metrics.exportMetricsReport(params);
    response.attachment(report.fileName);
    return response.send(report.file);
  }
}
