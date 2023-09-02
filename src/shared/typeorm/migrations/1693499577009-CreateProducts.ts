import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1693499577009 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'products',
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
              name: 'price',
              type: 'decimal',
              precision: 10,
              scale: 2,
            },
            {
              name: 'quantity',
              type: 'int',
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
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('products');
    }

}
