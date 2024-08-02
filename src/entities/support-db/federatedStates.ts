import 'reflect-metadata';
import { 
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  ManyToMany
} from 'typeorm';
// import { Banners } from '../communication-db/banners.ts';

@Entity('federated_states')
export class FederatedStates extends BaseEntity {
  @PrimaryColumn('int4', { generated: 'increment', name: 'id' })
  readonly id!: number;

  @Column('varchar', { name: 'name', nullable: false })
  name!: string;
  
  @Column('varchar', { name: 'uf', nullable: false })
  uf!: string;

  @Column('date', { name: 'created_at', nullable: false })
  createdAt!: Date;

  @Column('date', { name: 'updated_at', nullable: false })
  updatedAt!: Date;

  // TODO mapear os relacionamentos
  // @ManyToMany(() => Banners, (banners) => banners.federatedStates)
  // banners!: Banners[];

}
