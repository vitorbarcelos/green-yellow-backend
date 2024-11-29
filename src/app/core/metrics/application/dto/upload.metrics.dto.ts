import { UploadMetricsInterface } from '@metrics/application/contracts/metrics.input.interface';
import { MemoryStoredFile } from 'nestjs-form-data';
import { IsFile } from '@/app/utils/is.file';

export class UploadMetrics implements UploadMetricsInterface {
  @IsFile(true, 1e7, ['text/csv']) file: MemoryStoredFile;
}
