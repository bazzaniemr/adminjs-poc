import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Brand } from './brand.entity.ts';

@Entity({ database: 'product' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public price: number;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
}