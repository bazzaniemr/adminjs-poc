import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('terms_of_use')
export class TermsOfUse extends BaseEntity {
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

  static current(): Promise<TermsOfUse | null> {
    return this.createQueryBuilder().orderBy('updated_at', 'DESC').getOne();
  }
} 