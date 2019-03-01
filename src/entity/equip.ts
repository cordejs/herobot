import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Equip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  level: number;
}
