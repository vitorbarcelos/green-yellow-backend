import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class MetricsMigration implements MigrationInterface {
  public name: string = 'CreateMetricsTable->1732856476804';
  async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'Metrics',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'metric_id',
          type: 'int',
        },
        {
          name: 'date_time',
          type: 'timestamp',
        },
        {
          name: 'value',
          type: 'int',
        },
      ],
    });

    await queryRunner.createTable(table, true);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Metrics', true, true, true);
  }
}
