import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Banners } from "./Banners";

@Entity("federated_states", { schema: "public" })
export class FederatedStates {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "uf" })
  uf: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @ManyToMany(() => Banners, (banners) => banners.federatedStates)
  banners: Banners[];
}
