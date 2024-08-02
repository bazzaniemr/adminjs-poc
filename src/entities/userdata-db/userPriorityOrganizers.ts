import 'reflect-metadata';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user_priority_organizers')
export class UserPriorityOrganizers extends BaseEntity {
    // TODO mapear os relacionamentos
     // @OneToOne(() => Account)
  // @JoinColumn()
  // accountId: Account

    // @OneToOne(() => Organizer)
  // @JoinColumn()
  // organizerId: Service
}