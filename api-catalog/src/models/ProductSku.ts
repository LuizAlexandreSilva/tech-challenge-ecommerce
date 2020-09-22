import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_skus')
export class ProductSku {
  @PrimaryColumn()
  sku: string;

  @Column()
  product_id: string;

  @Column()
  name: string;

  @Column('integer')
  installment_count: number;

  @Column('numeric')
  installment_price: number;

  @Column('numeric')
  price: number;

  @Column('numeric')
  price_cash: number;

  @Column('numeric')
  old_price: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
