import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_details')
export class ProductDetail {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  product_id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  rating: string;

  @Column({ type: 'numeric' })
  sell_code: number;

  @Column({ type: 'numeric' })
  price_cash: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
