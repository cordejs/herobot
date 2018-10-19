import { HeroClass } from "../enums/heroclass";
import { ProficienceType } from "../enums/proficienceType";
import { Adventure } from "./adventure";
import { Entity } from "./entity";
import { PlayStatus } from "./playStatus";
import { Proficience } from "./proficience";
import { Shield } from "./shield";
import { Weapon } from "./weapon";
import * as playerLevels from "../../../data/levels.json";

export class Player extends Entity {
  private _name: string;
  private _level: number;
  private _hpTotal: number;
  private _hpActual: number;
  private _xp: number;
  private _levelMaxXp: number;
  private _heroClass: HeroClass;
  private _gold: number;
  private _deaths: number;
  private _monstersKilled: number;
  private _shield: Shield;
  private _weapon: Weapon;
  private _adventure: Adventure;
  private _adventureStartedTime: number;
  private _trainDamageStartedTime: number;
  private _trainShieldStartedTime: number;
  private _damageProficience: Proficience;
  private _shieldProficience: Proficience;
  private _actionStatus: PlayStatus;

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

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get level(): number {
    return this._level;
  }
  public set level(value: number) {
    this._level = value;
  }

  public get hpTotal(): number {
    return this._hpTotal;
  }
  public set hpTotal(value: number) {
    this._hpTotal = value;
  }

  public get xp(): number {
    return this._xp;
  }
  /**
   * When player xp is setted, the setter calcs if the user can
   * level up.
   */
  public set xp(value: number) {
    if (value + this._xp >= this._levelMaxXp) {
      this._xp = value + this._xp - this._levelMaxXp;
      this._level++;
      this._levelMaxXp = playerLevels[this._level];
    }
    this._xp = value;
  }

  public get hpActual(): number {
    return this._hpActual;
  }
  public set hpActual(value: number) {
    this._hpActual = value;
  }

  public get levelMaxXp(): number {
    return this._levelMaxXp;
  }
  public set levelMaxXp(value: number) {
    this._levelMaxXp = value;
  }

  public get heroClass(): HeroClass {
    return this._heroClass;
  }
  public set heroClass(value: HeroClass) {
    this._heroClass = value;
  }

  public get gold(): number {
    return this._gold;
  }
  public set gold(value: number) {
    this._gold = value;
  }

  public get deaths(): number {
    return this._deaths;
  }
  public set deaths(value: number) {
    this._deaths = value;
  }

  public get monstersKilled(): number {
    return this._monstersKilled;
  }
  public set monstersKilled(value: number) {
    this._monstersKilled = value;
  }

  public get shield(): Shield {
    return this._shield;
  }
  public set shield(value: Shield) {
    this._shield = value;
  }

  public get weapon(): Weapon {
    return this._weapon;
  }
  public set weapon(value: Weapon) {
    this._weapon = value;
  }

  public get adventure(): Adventure {
    return this._adventure;
  }
  public set adventure(value: Adventure) {
    this._adventure = value;
  }

  public get adventureStartedTime(): number {
    return this._adventureStartedTime;
  }
  public set adventureStartedTime(value: number) {
    this._adventureStartedTime = value;
  }

  public get trainDamageStartedTime(): number {
    return this._trainDamageStartedTime;
  }
  public set trainDamageStartedTime(value: number) {
    this._trainDamageStartedTime = value;
  }

  public get trainShieldStartedTime(): number {
    return this._trainShieldStartedTime;
  }
  public set trainShieldStartedTime(value: number) {
    this._trainShieldStartedTime = value;
  }

  public get damageProficience(): Proficience {
    return this._damageProficience;
  }
  public set damageProficience(value: Proficience) {
    this._damageProficience = value;
  }

  public get shieldProficience(): Proficience {
    return this._shieldProficience;
  }
  public set shieldProficience(value: Proficience) {
    this._shieldProficience = value;
  }

  public get actionStatus(): PlayStatus {
    return this._actionStatus;
  }
  public set actionStatus(value: PlayStatus) {
    this._actionStatus = value;
  }
}
