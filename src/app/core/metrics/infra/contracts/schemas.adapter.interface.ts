import { CreateMetricsInterface } from '@metrics/domain/contracts/metrics.input.interface';
import { MetricsSchema } from '@metrics/infra/schemas/metrics.schema';

export interface SchemasAdapterInterface {
  getSchemasByMetrics(metrics: CreateMetricsInterface[]): MetricsSchema[];
}
