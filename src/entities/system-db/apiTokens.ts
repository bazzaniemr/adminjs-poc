import 'reflect-metadata';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('api_tokens')
export class ApiTokens extends BaseEntity {
  @PrimaryColumn('int4', { generated: 'increment', name: 'id' })
  readonly id!: number;

  @Column('varchar', { name: 'value', nullable: false })
  value!: string;
  
  @Column('date', { name: 'created_at', nullable: false })
  createdAt!: Date;

  @Column('date', { name: 'updated_at', nullable: false })
  updatedAt!: Date;

  // TODO mapear os relacionamentos
    // @OneToOne(() => Service)
  // @JoinColumn()
  // serviceId: Service
}