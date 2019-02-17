import { Entity, Column } from "typeorm";
import { Equip } from "./equip";

@Entity()
export class Shield extends Equip {
  @Column()
  defence: number;
}
