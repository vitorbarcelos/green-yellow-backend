import { FindAggregatedMetricsInterface } from '@metrics/application/contracts/metrics.input.interface';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { MetricsAggregatesType } from '@metrics/domain/contracts/metrics.typings';
import { IsPositiveString } from '@/app/utils/is.positive.string';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindAggregatedMetrics implements FindAggregatedMetricsInterface {
  @ApiProperty({ description: 'Type of aggregation for the metrics.', enum: MetricsAggregatesType, example: MetricsAggregatesType.Day })
  @IsEnum(MetricsAggregatesType) @IsNotEmpty()
  public aggType: MetricsAggregatesType;

  @ApiProperty({ description: 'Metric identifier.', required: false, example: 218219 })
  @IsPositiveString() @IsOptional()
  public metricId?: number;

  @ApiProperty({ description: 'Initial date for the metric in ISO format.', required: false, example: '2023-11-21' })
  @IsDateString() @IsOptional()
  public dateInitial?: string;

  @ApiProperty({ description: 'Final date for the metric in ISO format.', required: false, example: '2023-11-22' })
  @IsDateString() @IsOptional()
  public finalDate?: string;

  @ApiProperty({ description: 'Maximum number of results to return (1-50).', required: false, example: 25 })
  @Transform((params) => Number(params.value))
  @Min(1) @Max(50) @IsOptional()
  maxResults?: number;

  @ApiProperty({ description: 'Page number for pagination, starting at 1.', required: false, example: 1 })
  @Transform((params) => Number(params.value)) @Min(1) @IsOptional()
  pageNumber?: number;
}
