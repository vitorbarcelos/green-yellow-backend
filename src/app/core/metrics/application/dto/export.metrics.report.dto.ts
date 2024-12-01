import { ExportMetricsReportInterface } from '@metrics/application/contracts/metrics.input.interface';
import { IsPositiveString } from '@/app/utils/is.positive.string';
import { IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExportMetricsReport implements ExportMetricsReportInterface {
  @ApiProperty({ description: 'Metric identifier.', required: false, example: 218219 })
  @IsPositiveString() @IsOptional()
  public metricId?: number;

  @ApiProperty({ description: 'Initial date for the metric in ISO format.', required: false, example: '2023-11-21' })
  @IsDateString() @IsOptional()
  public dateInitial?: string;

  @ApiProperty({ description: 'Final date for the metric in ISO format.', required: false, example: '2023-11-22' })
  @IsDateString() @IsOptional()
  public finalDate?: string;
}
