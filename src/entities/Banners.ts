import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FederatedStates } from "./FederatedStates";

@Entity("banners", { schema: "public" })
export class Banners {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "description", nullable: true })
  description: string | null;

  @Column("character varying", { name: "redirect_url", nullable: true })
  redirectUrl: string | null;

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

  @Column("character varying", { name: "desktop_image_url" })
  desktopImageUrl: string;

  @Column("character varying", { name: "mobile_image_url" })
  mobileImageUrl: string;

  @Column("timestamp without time zone", {
    name: "starts_at",
    default: () => "now()",
  })
  startsAt: Date;

  @Column("timestamp without time zone", {
    name: "ends_at",
    default: () => "now()",
  })
  endsAt: Date;

  @Column("boolean", { name: "enabled", default: () => "true" })
  enabled: boolean;

  @Column("boolean", { name: "frial_enabled", default: () => "false" })
  frialEnabled: boolean;

  @Column("enum", {
    name: "type",
    enum: ["home", "lessons", "initial_page", "bottom_initial_page"],
  })
  type: "home" | "lessons" | "initial_page" | "bottom_initial_page";

  @Column("integer", { name: "clicks", default: () => "0" })
  clicks: number;

  @ManyToMany(
    () => FederatedStates,
    (federatedStates) => federatedStates.banners
  )
  @JoinTable({
    name: "banner_federated_states",
    joinColumns: [{ name: "banner_id", referencedColumnName: "id" }],
    inverseJoinColumns: [
      { name: "federated_state_id", referencedColumnName: "id" },
    ],
    schema: "public",
  })
  federatedStates: FederatedStates[];
}
