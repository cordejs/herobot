import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne
} from "typeorm";
import { Task } from "../enums/action";
import { Adventure } from "./adventure";

@Entity()
export class PlayStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  task: Task;

  @Column()
  monsterskilled: number;

  @Column()
  exp: number;

  @Column()
  gold: number;

  @Column()
  timestarted: number;

  @JoinColumn()
  @OneToOne(type => Adventure)
  adventure: Promise<Adventure>;
}
