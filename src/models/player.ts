import { Shield } from "../interfaces/shield";
import { Weapon } from "../interfaces/weapon";
import { Proficience } from "../interfaces/proficience";
import { HeroClass } from "../enums/heroclass";
import { ProficienceType } from "../enums/proficienceType";
import { Entity } from "./entity";
import { Adventure } from "models/adventure";

export class Player extends Entity {
  private _name: string;
  private _userID: string;
  private _level: number;
  private _xp: number;
  private _levelMaxXp: number;
  private _heroClass: HeroClass;
  private _gold: number;
  private _shield: Shield;
  private _weapon: Weapon;
  private _adventure: Adventure;
  private _damageProficience: Proficience;
  private _shieldProficience: Proficience;

  constructor(name: string, heroclass: HeroClass, userID: string) {
    super();
    this._name = name;
    this._heroClass = heroclass;
    this._level = 1;
    this._levelMaxXp = 100;
    this._userID = userID;
    this._damageProficience = {
      level: 0,
      levelMaxXp: 200,
      type: ProficienceType.DAMAGE,
      xp: 0
    };
    this._shieldProficience = {
      level: 0,
      levelMaxXp: 200,
      type: ProficienceType.SHIELD,
      xp: 0
    };
  }

  /**
   * Return the total amount of damage that the player give
   */
  damage(): number {
    return this._weapon.damage + this._damageProficience.level / 2;
  }

  /**
   * Return the total amount of defence
   */
  defence(): number {
    return this._shield.defence + this._shieldProficience.level / 2;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get level(): number {
    return this._level;
  }
  set level(value: number) {
    this._level = value;
  }
  get xp(): number {
    return this._xp;
  }
  set xp(value: number) {
    this._xp = value;
  }
  get levelMaxXp(): number {
    return this._levelMaxXp;
  }
  set levelMaxXp(value: number) {
    this._levelMaxXp = value;
  }
  get heroClass(): HeroClass {
    return this._heroClass;
  }
  set heroClass(value: HeroClass) {
    this._heroClass = value;
  }
  get gold(): number {
    return this._gold;
  }
  set gold(value: number) {
    this._gold = value;
  }
  get shield(): Shield {
    return this._shield;
  }
  set shield(value: Shield) {
    this._shield = value;
  }
  get weapon(): Weapon {
    return this._weapon;
  }
  set weapon(value: Weapon) {
    this._weapon = value;
  }
  get damageProficience(): Proficience {
    return this._damageProficience;
  }
  set damageProficience(value: Proficience) {
    this._damageProficience = value;
  }
  get shieldProficience(): Proficience {
    return this._shieldProficience;
  }
  set shieldProficience(value: Proficience) {
    this._shieldProficience = value;
  }
  public get userID(): string {
    return this._userID;
  }
  public set userID(value: string) {
    this._userID = value;
  }
  public get adventure(): Adventure {
    return this._adventure;
  }
  public set adventure(value: Adventure) {
    this._adventure = value;
  }
}
