import 'reflect-metadata';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Log } from '../../utils/log.ts';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryColumn('int4', { generated: 'increment', name: 'id' })
  readonly id!: number;

  @Column('varchar', { name: 'name', nullable: false })
  name!: string;

  @Column('varchar', { name: 'email', nullable: false })
  email!: string;
  
  @Column('varchar', { name: 'phone', nullable: true })
  phone: string;
  
  @Column('varchar', { name: 'avatar_url', nullable: true })
  avatarUrl: string;
  
  @Column('varchar', { name: 'password', nullable: false })
  password!: string;

  @Column('date', { name: 'created_at', nullable: false })
  createdAt!: Date;

  @Column('date', { name: 'updated_at', nullable: false })
  updatedAt!: Date;

  // TODO mapear os relacionamentos
  // @OneToOne(() => Company)
  // @JoinColumn()
  // companyId: Company

  // @OneToMany(() => Log, log => log.userId)
  // logs: Log[];
}