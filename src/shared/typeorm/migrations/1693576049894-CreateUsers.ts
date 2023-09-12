import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1693576049894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(250)',
          },
          {
            name: 'email',
            type: 'varchar(250)',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'text',
          },
          {
            name: 'avatar',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'now()',
            isNullable: true,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
