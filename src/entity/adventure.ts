import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BaseEntity
} from "typeorm";
import { Monster } from "./monster";

@Entity()
export class Adventure extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @Column()
  name: string;

  @JoinColumn()
  @OneToOne(type => Monster)
  monster: Promise<Monster>;
}
