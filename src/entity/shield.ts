import {
  Entity,
  OneToOne,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  BaseEntity
} from "typeorm";
import { Equip } from "./equip";

@Entity()
export class Shield extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @OneToOne(type => Equip)
  equip: Promise<Equip>;

  @Column()
  defence: number;
}
