import { HeroClass } from "../enums/heroclass";
import { ProficienceType } from "../enums/proficienceType";
import { Adventure } from "../interfaces/adventure";
import { PlayStatus } from "../interfaces/playStatus";
import { Proficience } from "../interfaces/proficience";
import { Shield } from "../interfaces/shield";
import { Weapon } from "../interfaces/weapon";
import { JsonHandle } from "../utils/JsonHandle";

export class Player {
  private _id: string;
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

  /**
   * @constructor
   * @param name name of the player
   * @param heroclass player's class
   * @param userID id of user's discord
   */
  constructor(name?: string, heroclass?: HeroClass, userID?: string) {
    this.init(name, heroclass, userID);
  }

  /**
   * Restore all user's informations to their default value
   */
  reset(): void {
    this.init(this.name, this.heroClass, this.id);
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

    this.deaths = 0;
    this.monstersKilled = 0;
    this.hpActual = 100;

    this.damageProficience = damageProficience;
    this.shieldProficience = shieldProficience;
    this.weapon = JsonHandle.getWeaponById(1);
    this.shield = JsonHandle.getShieldById(1);
  }

  /**
   * Gets a player object(not instancialized) and instancialize it
   */
  public static initializePlayer(properties: Player): Player {
    const player: Player = new Player();
    Object.keys(properties).forEach(key => (player[key] = properties[key]));
    return player;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    this._id = value;
  }

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Getter level
   * @return {number}
   */
  public get level(): number {
    return this._level;
  }

  /**
   * Setter level
   * @param {number} value
   */
  public set level(value: number) {
    this._level = value;
  }

  /**
   * Getter hpTotal
   * @return {number}
   */
  public get hpTotal(): number {
    return this._hpTotal;
  }

  /**
   * Setter hpTotal
   * @param {number} value
   */
  public set hpTotal(value: number) {
    this._hpTotal = value;
  }

  /**
   * Getter xp
   * @return {number}
   */
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
      this._levelMaxXp = JsonHandle.getLevelById(this._level).exp;
    }
    this._xp = value;
  }

  /**
   * Getter levelMaxXp
   * @return {number}
   */
  public get levelMaxXp(): number {
    return this._levelMaxXp;
  }

  /**
   * Setter levelMaxXp
   * @param {number} value
   */
  public set levelMaxXp(value: number) {
    this._levelMaxXp = value;
  }

  /**
   * Getter heroClass
   * @return {HeroClass}
   */
  public get heroClass(): HeroClass {
    return this._heroClass;
  }

  /**
   * Setter heroClass
   * @param {HeroClass} value
   */
  public set heroClass(value: HeroClass) {
    this._heroClass = value;
  }

  /**
   * Getter gold
   * @return {number}
   */
  public get gold(): number {
    return this._gold;
  }

  /**
   * Setter gold
   * @param {number} value
   */
  public set gold(value: number) {
    this._gold = value;
  }

  /**
   * Getter deaths
   * @return {number}
   */
  public get deaths(): number {
    return this._deaths;
  }

  /**
   * Setter deaths
   * @param {number} value
   */
  public set deaths(value: number) {
    this._deaths = value;
  }

  /**
   * Getter monstersKilled
   * @return {number}
   */
  public get monstersKilled(): number {
    return this._monstersKilled;
  }

  /**
   * Setter monstersKilled
   * @param {number} value
   */
  public set monstersKilled(value: number) {
    this._monstersKilled = value;
  }

  /**
   * Getter shield
   * @return {Shield}
   */
  public get shield(): Shield {
    return this._shield;
  }

  /**
   * Setter shield
   * @param {Shield} value
   */
  public set shield(value: Shield) {
    this._shield = value;
  }

  /**
   * Getter weapon
   * @return {Weapon}
   */
  public get weapon(): Weapon {
    return this._weapon;
  }

  /**
   * Setter weapon
   * @param {Weapon} value
   */
  public set weapon(value: Weapon) {
    this._weapon = value;
  }

  /**
   * Getter adventure
   * @return {Adventure}
   */
  public get adventure(): Adventure {
    return this._adventure;
  }

  /**
   * Setter adventure
   * @param {Adventure} value
   */
  public set adventure(value: Adventure) {
    this._adventure = value;
  }

  /**
   * Getter adventureStartedTime
   * @return {number}
   */
  public get adventureStartedTime(): number {
    return this._adventureStartedTime;
  }

  /**
   * Setter adventureStartedTime
   * @param {number} value
   */
  public set adventureStartedTime(value: number) {
    this._adventureStartedTime = value;
  }

  /**
   * Getter trainDamageStartedTime
   * @return {number}
   */
  public get trainDamageStartedTime(): number {
    return this._trainDamageStartedTime;
  }

  /**
   * Setter trainDamageStartedTime
   * @param {number} value
   */
  public set trainDamageStartedTime(value: number) {
    this._trainDamageStartedTime = value;
  }

  /**
   * Getter trainShieldStartedTime
   * @return {number}
   */
  public get trainShieldStartedTime(): number {
    return this._trainShieldStartedTime;
  }

  /**
   * Setter trainShieldStartedTime
   * @param {number} value
   */
  public set trainShieldStartedTime(value: number) {
    this._trainShieldStartedTime = value;
  }

  /**
   * Getter damageProficience
   * @return {Proficience}
   */
  public get damageProficience(): Proficience {
    return this._damageProficience;
  }

  /**
   * Setter damageProficience
   * @param {Proficience} value
   */
  public set damageProficience(value: Proficience) {
    this._damageProficience = value;
  }

  /**
   * Getter shieldProficience
   * @return {Proficience}
   */
  public get shieldProficience(): Proficience {
    return this._shieldProficience;
  }

  /**
   * Setter shieldProficience
   * @param {Proficience} value
   */
  public set shieldProficience(value: Proficience) {
    this._shieldProficience = value;
  }

  /**
   * Getter actionStatus
   * @return {PlayStatus}
   */
  public get actionStatus(): PlayStatus {
    return this._actionStatus;
  }

  /**
   * Setter actionStatus
   * @param {PlayStatus} value
   */
  public set actionStatus(value: PlayStatus) {
    this._actionStatus = value;
  }

  /**
   * Getter hpActual
   * @return {number}
   */
  public get hpActual(): number {
    return this._hpActual;
  }

  /**
   * Setter hpActual
   * @param {number} value
   */
  public set hpActual(value: number) {
    this._hpActual = value;
  }
}
