import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductSku1600724264342 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_skus',
        columns: [
          {
            name: 'sku',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'product_id',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'installment_count',
            type: 'integer',
          },
          {
            name: 'installment_price',
            type: 'numeric',
          },
          {
            name: 'price',
            type: 'numeric',
          },
          {
            name: 'price_cash',
            type: 'numeric',
          },
          {
            name: 'old_price',
            type: 'numeric',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'ProductSku',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_skus');
  }
}
