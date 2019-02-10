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
export class Weapon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @OneToOne(type => Equip)
  equip: Promise<Equip>;

  @Column()
  damage: number;
}
