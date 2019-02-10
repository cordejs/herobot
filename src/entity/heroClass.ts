import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class HeroClass extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  damagebuff: number;

  @Column()
  shieldbuff: number;

  @Column()
  hpbuff: number;

  @Column()
  goldbuff: number;

  @Column()
  expbuff: number;

  @Column()
  attackspeedbuff: number;
}
