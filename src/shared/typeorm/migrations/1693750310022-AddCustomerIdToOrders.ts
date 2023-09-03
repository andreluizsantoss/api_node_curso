import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCustomerIdToOrders1693750310022 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders',
        new TableColumn({
          name: 'customer_id',
          type: 'id',
          isNullable: true,
        }),
      );

      await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
          name: 'OrdersCustomer',
          columnNames: ['customer_id'],
          referencedTableName: 'customers',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
      await queryRunner.dropColumn('orders', 'customer_id');
    }
}