import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Metrics')
export class MetricsSchema {
  @PrimaryGeneratedColumn() id: number;
  @Column() metric_id: number;
  @Column() date_time: Date;
  @Column() value: number;
}
