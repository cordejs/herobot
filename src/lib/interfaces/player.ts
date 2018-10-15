import { Shield } from "./shield";
import { Weapon } from "./weapon";
import { Proficience } from "./proficience";
import { HeroClass } from "../enums/heroclass";
import { Adventure } from "./adventure";
import { ProficienceType } from "../enums/proficienceType";
import { Entity } from "./entity";
import { PlayStatus } from "./playStatus";

export class Player extends Entity {
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
  shield: Shield;
  weapon: Weapon;
  adventure: Adventure;
  adventureStartedTime: number;
  trainDamageStartedTime: number;
  trainShieldStartedTime: number;
  damageProficience: Proficience;
  shieldProficience: Proficience;
  actionStatus: PlayStatus;

  constructor(name: string, heroclass: HeroClass, userID: string) {
    super();

    const shield: Shield = {
      defence: 1,
      name: "Wood-shield",
      price: 1
    };

    const weapon: Weapon = {
      damage: 1,
      name: "Wood-Sword",
      price: 1
    };

    const damageProficience: Proficience = {
      level: 0,
      levelMaxXp: 200,
      type: ProficienceType.DAMAGE,
      xp: 0
    };

    const shieldProficience: Proficience = {
      level: 0,
      levelMaxXp: 200,
      type: ProficienceType.SHIELD,
      xp: 0
    };

    this.name = name;
    this.heroClass = heroclass;
    this.level = 1;
    this.levelMaxXp = 100;
    super.id = userID;
    this.hpTotal = 100;
    this.deaths = 0;
    this.monstersKilled = 0;
    this.hpActual = 100;
    this.damageProficience = damageProficience;
    this.shieldProficience = shieldProficience;
    this.weapon = weapon;
    this.shield = shield;
  }
}
