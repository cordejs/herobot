import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 *
 * Defines if the potion will heal in fixed value
 * or in percentage
 *
 * @public Basicaly used by potion entity
 * @type defines only two types of potion heal
 */
export type HealDefinition = "amount" | "percentage";

@Entity()
export class Potion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  sellPrice: number;

  @Column()
  hpHeal: number;

  @Column()
  HealDefinition: HealDefinition;
}
