import 'reflect-metadata';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('services')
export class Services extends BaseEntity {
  @PrimaryColumn('int4', { generated: 'increment', name: 'id' })
  readonly id!: number;

  @Column('varchar', { name: 'name', nullable: false })
  name!: string;
  
  @Column('varchar', { name: 'domain', nullable: false })
  domain!: string;
  
  @Column('date', { name: 'created_at', nullable: false })
  createdAt!: Date;

  @Column('date', { name: 'updated_at', nullable: false })
  updatedAt!: Date;
}
