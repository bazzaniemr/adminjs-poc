import 'reflect-metadata';
import {
  BaseEntity,
  Column,
  Entity,
  In,
  JoinTable,
  LessThanOrEqual,
  ManyToMany,
  MoreThanOrEqual,
} from 'typeorm';

import { FederatedStates } from '../support-db/federatedStates.ts';

export enum BannerType {
  BOTTOM_INITIAL_PAGE = 'bottom_initial_page',
  HOME = 'home',
  INITIAL_PAGE = 'initial_page',
  LESSONS = 'lessons',
}

export const BannerTypeOptions: string[] = Object.values(BannerType);

@Entity('banners')
export class Banners extends BaseEntity {
  @Column('int4', { generated: 'increment', name: 'id', primary: true })
  readonly id!: number;

  @Column('varchar', { name: 'name', nullable: false })
  name!: string;

  @Column('varchar', { name: 'description', nullable: true })
  description!: string;

  @Column('varchar', { name: 'redirect_url', nullable: false })
  redirectUrl!: string;

  @Column('varchar', { name: 'mobile_image_url', nullable: false })
  mobileImageUrl!: string;

  @Column('varchar', { name: 'desktop_image_url', nullable: false })
  desktopImageUrl!: string;

  @Column('date', { name: 'starts_at', nullable: false })
  startsAt!: Date;

  @Column('date', { name: 'ends_at', nullable: false })
  endsAt!: Date;

  @Column('boolean', { name: 'enabled', nullable: false })
  enabled: boolean = true;

  @Column('enum', { enum: BannerTypeOptions, name: 'type', nullable: false })
  type!: BannerType;

  @Column('boolean', { name: 'frial_enabled', nullable: false })
  frialEnabled: boolean = false;

  @Column('int', { default: 0, name: 'clicks', nullable: false })
  clicks: number = 0;

  @Column('date', { name: 'created_at', nullable: false })
  createdAt!: Date;

  // @JoinTable({
  //   inverseJoinColumn: {
  //     name: 'federated_state_id',
  //     referencedColumnName: 'id',
  //   },
  //   joinColumn: {
  //     name: 'banner_id',
  //     referencedColumnName: 'id',
  //   },
  //   name: 'banner_federated_states',
  // })
  // @ManyToMany(() => FederatedStates, (state) => state.banners, {
  //   cascade: true,
  //   eager: true,
  // })
  // federatedStates!: FederatedStates[];

  static getTableName(): string {
    return this.getRepository().metadata.tableName;
  }

  // static findByOrganizerFederalState(
  //   federalStates: string[],
  // ): Promise<Banners[]> {
  //   return Banners.find({
  //     order: {
  //       createdAt: 'DESC',
  //     },
  //     relations: ['federatedStates'],
  //     where: {
  //       enabled: true,
  //       endsAt: MoreThanOrEqual(new Date()),
  //       federatedStates: {
  //         uf: In(federalStates),
  //       },
  //       startsAt: LessThanOrEqual(new Date()),
  //     },
  //   });
  // }

  public incrementClicks(): void {
    this.clicks += 1;
  }
}
