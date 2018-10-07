import { Shield } from "./shield";
import { Weapon } from "./weapon";
import { Proficience } from "./proficience";
import { HeroClass } from "../enums/heroclass";
import { Entity } from "./entity";
import { Adventure } from "./adventure";

export interface Player extends Entity {
  name: string;
  level: number;
  hpTotal: number;
  hpActual: number;
  xp: number;
  levelMaxXp: number;
  heroClass: HeroClass;
  gold: number;
  deaths: number;
  monstersKilled: number;
  shield?: Shield;
  weapon?: Weapon;
  adventure?: Adventure;
  adventureStartedTime?: number;
  trainDamageStartedTime?: number;
  trainShieldStartedTime?: number;
  damageProficience: Proficience;
  shieldProficience: Proficience;
}
