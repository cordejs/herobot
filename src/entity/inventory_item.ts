import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  BaseEntity
} from "typeorm";
import { Hero } from "./hero";
import { Equip } from "./equip";

@Entity("inventory_item")
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: "idhero" })
  @OneToOne(type => Hero)
  hero: Promise<Hero>;

  @JoinColumn({ name: "idequip" })
  @OneToOne(type => Equip)
  equip: Promise<Equip>;
}
