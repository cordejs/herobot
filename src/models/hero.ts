import { HeroClass } from "../enums/heroclass";
import { ProficienceType } from "../enums/proficienceType";
import { Adventure } from "../interfaces/adventure";
import { PlayStatus } from "../interfaces/playStatus";
import { Proficience } from "../interfaces/proficience";
import { Shield } from "../interfaces/shield";
import { Weapon } from "../interfaces/weapon";
import { JsonHandle } from "../utils/JsonHandle";
import { Entity } from "./entity";
import { InventoryItem } from "../interfaces/inventoryItem";

export class Hero extends Entity {
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
  inventory: InventoryItem[];

  /**
   * @param name name of the player
   * @param heroclass player's class
   * @param userID id of user's discord
   * @constructor
   */
  constructor(name?: string, heroclass?: HeroClass, userID?: string) {
    super();
    this.init(name, heroclass, userID);
  }

  /**
   * Restore all user's informations to their default value
   */
  reset(): void {
    this.init(this.name, this.heroClass, this.id);
  }

  updateExp(value: number): void {
    if (value + this.xp >= this.levelMaxXp) {
      this.xp = value + this.xp - this.levelMaxXp;
      this.level++;
      this.levelMaxXp = JsonHandle.getLevelById(this.level).exp;
    }
    this.xp = value;
  }

  /**
   * Set the default values of the properties
   * @param name player's name
   * @param heroclass with class the player will be
   * @param userID id of discord user's
   */
  private init(name?: string, heroclass?: HeroClass, userID?: string) {
    const proficienceLevel = JsonHandle.getProficienceById(1);

    const damageProficience: Proficience = {
      level: 1,
      levelMaxXp: proficienceLevel.exp,
      type: ProficienceType.DAMAGE,
      xp: 0
    };

    const shieldProficience: Proficience = {
      level: 0,
      levelMaxXp: proficienceLevel.exp,
      type: ProficienceType.SHIELD,
      xp: 0
    };

    if (userID !== undefined) this.id = userID;
    if (name !== undefined) this.name = name;
    if (heroclass !== undefined) this.heroClass = heroclass;

    this.level = 1;
    this.levelMaxXp = 100;
    this.hpTotal = 100;
    this.gold = 0;

    this.deaths = 0;
    this.monstersKilled = 0;
    this.hpActual = 100;

    this.damageProficience = damageProficience;
    this.shieldProficience = shieldProficience;
    this.weapon = JsonHandle.getWeaponById(1);
    this.shield = JsonHandle.getShieldById(1);

    this.inventory = [];
    this.inventory.push({ item: this.weapon, amount: 1, equiped: true });
    this.inventory.push({ item: this.shield, amount: 1, equiped: true });

    this.adventureStartedTime = 0;
    this.trainDamageStartedTime = 0;
    this.trainShieldStartedTime = 0;
    this.actionStatus = null;
    this.adventure = null;
  }
}
