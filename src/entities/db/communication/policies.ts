import 'reflect-metadata';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('policies')
export class Policies extends BaseEntity {
  @PrimaryColumn('int4', { generated: 'increment', name: 'id' })
  readonly id!: number;

  @Column('varchar', { name: 'markdown_text', nullable: false })
  markdownText!: string;

  @Column('date', { name: 'created_at', nullable: false })
  createdAt!: Date;

  @Column('date', { name: 'updated_at', nullable: false })
  updatedAt!: Date;

  static getTableName(): string {
    return this.getRepository().metadata.tableName;
  }

  static current(): Promise<Policies | null> {
    return this.createQueryBuilder().orderBy('updated_at', 'DESC').getOne();
  }
}