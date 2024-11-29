import { FindUserInterface } from '@user/domain/contracts/user.input.interface';
import { UserInterface } from '@user/domain/contracts/user.interface';
import { UserSchema } from '@user/infra/schemas/user.schema';
import { FindOptionsWhere } from 'typeorm';
import { MetricsSchema } from '@metrics/infra/schemas/metrics.schema';
import { FindAggregatedMetrics } from '@metrics/application/dto/find.aggregated.metrics.dto';

export interface MetricsAdapterInterface {
  getSchemaByMetrics(user: UserInterface): MetricsSchema;
  getMetricsBySchema(schema: Optional<MetricsSchema>, throwIfNil?: boolean): Optional<UserInterface>;
  getAggregatedMetricsFindOptions<E extends MetricsSchema>(params: FindAggregatedMetrics): FindOptionsWhere<E>[];
}
