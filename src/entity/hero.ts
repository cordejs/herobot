import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { HeroClass } from "../enums/heroclass";
import { Shield } from "../interfaces/shield";
import { Weapon } from "../interfaces/weapon";
import { Adventure } from "../interfaces/adventure";
import { Proficience } from "../interfaces/proficience";
import { PlayStatus } from "../interfaces/playStatus";
import { InventoryItem } from "../interfaces/inventoryItem";

@Entity()
export class Hero {

    @PrimaryGeneratedColumn()
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
    heroClass: HeroClass;

    @Column()
    gold: number;

    @Column()
    deaths: number;

    @Column()
    monstersKilled: number;

    shield: Shield;
    weapon: Weapon;
    adventure: Adventure;
    adventureStartedTime: number;
    trainDamageStartedTime: number;
    trainShieldStartedTime: number;
    damageProficience: Proficience;
    shieldProficience: Proficience;
    actionStatus: PlayStatus;
    inventory: InventoryItem[];
}