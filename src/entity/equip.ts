import { PrimaryGeneratedColumn, Column } from "typeorm";

export abstract class Equip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  level: number;
}
