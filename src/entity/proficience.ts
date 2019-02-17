import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Proficience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @Column()
  xp: number;

  @Column()
  levelmaxxp: number;
}
