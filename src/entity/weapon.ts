import { Entity, Column } from "typeorm";
import { Equip } from "./equip";

@Entity()
export class Weapon extends Equip {
  @Column()
  damage: number;
}
