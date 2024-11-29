import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserMigration implements MigrationInterface {
  public name: string = 'CreateUserTable->1732856442543';
  async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'User',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'createdAt',
          type: 'timestamp',
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          isNullable: true,
        },
        {
          name: 'firstName',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'lastName',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'displayName',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'phone',
          type: 'varchar',
          isUnique: true,
          length: '255',
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          length: '255',
        },
        {
          name: 'password',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'active',
          type: 'boolean',
        },
        {
          name: 'role',
          type: 'enum',
          enumName: 'User roles',
          enum: ['admin', 'basic'],
        },
      ],
    });

    await queryRunner.createTable(table, true);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('User', true, true, true);
  }
}
