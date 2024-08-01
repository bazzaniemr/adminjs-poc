import 'reflect-metadata';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryColumn('int4', { generated: 'increment', name: 'id' })
  readonly id!: number;

  @Column('varchar', { name: 'name', nullable: false })
  name!: string;

  @Column('varchar', { name: 'email', nullable: false })
  email!: string;
  
  @Column('varchar', { name: 'phone', nullable: false })
  phone: string;
  
  @Column('varchar', { name: 'avatar_url', nullable: false })
  avatarUrl: string;
  
  @Column('varchar', { name: 'password', nullable: false })
  passsword!: string;

  @Column('date', { name: 'created_at', nullable: false })
  createdAt!: Date;

  @Column('date', { name: 'updated_at', nullable: false })
  updatedAt!: Date;

  // @OneToOne(() => Company)
  // @JoinColumn()
  // companyId: Company
}