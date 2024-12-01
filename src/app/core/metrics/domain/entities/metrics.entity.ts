import { MetricsInterface } from '@metrics/domain/contracts/metrics.interface';
import { instanceToPlain } from 'class-transformer';

export class MetricsEntity implements MetricsInterface {
  public readonly metricId: number;
  public readonly dateTime: Date;
  public readonly value: number;

  public constructor(user: MetricsInterface) {
    this.metricId = user.metricId;
    this.dateTime = user.dateTime;
    this.value = user.value;
  }

  public toPlain(): MetricsInterface {
    const plain = instanceToPlain(this);
    return <MetricsInterface>plain;
  }
}
