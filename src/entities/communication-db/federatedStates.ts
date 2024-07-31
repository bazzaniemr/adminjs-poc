import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
} from 'typeorm';

import { Banners } from './banners.ts';

@Entity('federated_states')
export class FederatedStatesCom extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column('int', { generated: 'increment', primary: true })
  id!: number;

  @Column('varchar', { name: 'name', nullable: false })
  name!: string;

  @Column('varchar', { name: 'uf', nullable: false })
  uf!: string;

  @ManyToMany(() => Banners, (banners) => banners.federatedStates)
  banners!: Banners[];
}