import 'reflect-metadata';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('api_token_privileges')
export class ApiTokenPrivileges extends BaseEntity {
    // TODO mapear os relacionamentos
     // @OneToOne(() => ApiTokens)
  // @JoinColumn()
  // apiTokenId: ApiTokens

    // @OneToOne(() => Service)
  // @JoinColumn()
  // serviceId: Service
}