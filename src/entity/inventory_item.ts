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
export class InventoryItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @OneToOne(type => Hero)
  hero: Promise<Hero>;

  @JoinColumn()
  @OneToOne(type => Equip)
  equip: Promise<Equip>;
}
