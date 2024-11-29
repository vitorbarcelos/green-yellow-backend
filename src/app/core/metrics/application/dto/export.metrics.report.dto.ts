import { ExportMetricsReportInterface } from '@metrics/application/contracts/metrics.input.interface';
import { IsPositiveString } from '@/app/utils/is.positive.string';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class ExportMetricsReport implements ExportMetricsReportInterface {
  @IsDateString() @IsNotEmpty() public finalDate: string;
  @IsDateString() @IsNotEmpty() public dateInitial: string;
  @IsPositiveString() @IsNotEmpty() public metricId: number;
}
