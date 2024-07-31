import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './product.entity.ts';

@Entity({ database: 'product' })
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
  
  @OneToMany(() => Product, (product) => product.brand)
  products: Product[]
}