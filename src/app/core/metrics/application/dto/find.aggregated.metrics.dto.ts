import { FindAggregatedMetricsInterface } from '@metrics/application/contracts/metrics.input.interface';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { MetricsAggregatesType } from '@metrics/domain/contracts/metrics.typings';
import { IsPositiveString } from '@/app/utils/is.positive.string';
import { Transform } from 'class-transformer';

export class FindAggregatedMetrics implements FindAggregatedMetricsInterface {
  @Transform((params) => Number(params.value)) @Min(0) @Max(50) @IsOptional() maxResults?: number;
  @Transform((params) => Number(params.value)) @Min(0) @IsOptional() pageNumber?: number;
  @IsEnum(MetricsAggregatesType) @IsNotEmpty() public aggType: MetricsAggregatesType;
  @IsPositiveString() @IsOptional() public metricId: number;
  @IsDateString() @IsOptional() public dateInitial: string;
  @IsDateString() @IsOptional() public finalDate: string;
}
