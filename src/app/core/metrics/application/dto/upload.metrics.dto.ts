import { UploadMetricsInterface } from '@metrics/application/contracts/metrics.input.interface';
import { MemoryStoredFile } from 'nestjs-form-data';
import { ApiProperty } from '@nestjs/swagger';
import { IsFile } from '@/app/utils/is.file';

export class UploadMetrics implements UploadMetricsInterface {
  @ApiProperty({ description: 'CSV file containing the metrics data.', type: 'string', format: 'binary', required: true })
  @IsFile(true, 1e7, ['text/csv'])
  file: MemoryStoredFile;
}
