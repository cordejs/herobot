import { Shield } from "./shield";
import { Weapon } from "./weapon";
import { Proficience } from "./proficience";
import { HeroClass } from "../enums/heroclass";
import { ProficienceType } from "../enums/proficienceType";
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
  shield?: Shield;
  weapon?: Weapon;
  adventure?: Adventure;
  adventureStartedTime?: number;
  damageProficience: Proficience;
  shieldProficience: Proficience;
}

/**
 * Return the total amount of damage that the player give
 */
export function playerDamage(): number {
  return this._weapon.damage + this._damageProficience.level / 2;
}

/**
 * Return the total amount of defence
 */
export function playerDefence(): number {
  return this._shield.defence + this._shieldProficience.level / 2;
}

/**
 * Create a new player object
 * @param name player's name
 * @param heroclass player's class
 * @param userID user's discord id
 */
export function createObjectPlayer(name: string, heroclass: HeroClass, userID: string): Player {
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

  const player: Player = {
    name: name,
    heroClass: heroclass,
    level: 1,
    levelMaxXp: 100,
    id: userID,
    hpTotal: 100,
    hpActual: 100,
    damageProficience: damageProficience,
    shieldProficience: shieldProficience,
    xp: 0,
    gold: 0,
    // First weapon and shield wasn't defined yet
    // shield: undefined,
    // weapon: undefined,
  };
  return player;
}
