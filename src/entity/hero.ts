import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
  ManyToMany,
  OneToMany,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import { Weapon } from "./weapon";
import { PlayStatus } from "./playStatus";
import { Proficience } from "./proficience";
import { HeroClass } from "./heroClass";
import { Shield } from "./shield";
import { InventoryItem } from "./inventory_item";
import { JsonHandle } from "../utils/jsonHandle";

@Entity()
export class Hero extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  level: number;

  @Column()
  hpTotal: number;

  @Column()
  hpActual: number;

  @Column()
  xp: number;

  @Column()
  levelMaxXp: number;

  @Column()
  gold: number;

  @Column()
  deaths: number;

  @Column()
  monstersKilled: number;

  @JoinColumn()
  @OneToOne(type => Shield)
  shield: Promise<Shield>;

  @JoinColumn()
  @OneToOne(type => Weapon)
  weapon: Promise<Weapon>;

  @JoinColumn()
  @OneToOne(type => PlayStatus)
  playStatus: Promise<PlayStatus>;

  @JoinColumn()
  @OneToOne(type => Proficience)
  damageProficiente: Promise<Proficience>;

  @JoinColumn()
  @OneToOne(type => Proficience)
  defenceProficience: Promise<Proficience>;

  @JoinColumn()
  @OneToOne(type => HeroClass)
  heroClass: Promise<HeroClass>;

  @JoinColumn()
  @ManyToOne(type => InventoryItem)
  inventoryItens: Promise<InventoryItem[]>;

  /**
   * @param name name of the player
   * @param heroclass player's class
   * @param userID id of user's discord
   * @constructor
   */
  constructor(name?: string, heroclass?: HeroClass, userID?: number) {
    super();
    this.init(name, heroclass, userID);
  }

  /**
   * Restore all user's informations to their default value
   */
  async reset(): Promise<void> {
    const heroClass = await this.heroClass;
    this.init(this.name, heroClass, this.id);
  }

  updateExp(value: number): void {
    if (value + this.xp >= this.levelMaxXp) {
      this.xp = value + this.xp - this.levelMaxXp;
      this.level++;
      this.levelMaxXp = JsonHandle.getLevelById(this.level).exp;
    }
    this.xp += value;
  }

  /**
   * Set the default values of the properties
   * @param name player's name
   * @param heroclass with class the player will be
   * @param userID id of discord user's
   */
  private async init(name?: string, heroclass?: HeroClass, userID?: number) {
    const proficienceLevel = JsonHandle.getProficienceById(1);

    const damageProficience = new Proficience();
    damageProficience.level = 1;
    damageProficience.levelmaxxp = proficienceLevel.exp;

    await damageProficience.save();
    this.damageProficiente = Promise.resolve(damageProficience);

    const defenceProficience = new Proficience();
    damageProficience.level = 1;
    damageProficience.levelmaxxp = proficienceLevel.exp;

    await defenceProficience.save();
    this.defenceProficience = Promise.resolve(defenceProficience);

    if (userID !== undefined) this.id = userID;
    if (name !== undefined) this.name = name;

    if (heroclass !== undefined) {
      this.heroClass = Promise.resolve(heroclass);
    }

    this.level = 1;
    this.levelMaxXp = 100;
    this.xp = 0;
    this.hpTotal = 100;
    this.gold = 0;

    this.deaths = 0;
    this.monstersKilled = 0;
    this.hpActual = 100;

    //this.weapon = Promise.resolve(JsonHandle.getWeaponById(1));
    //this.shield = Promise.resolve(JsonHandle.getShieldById(1));

    //this.inventoryItens = Promise.resolve([this.weapon, this.shield]);
  }
}
