import * as shields from "../../data/shield.json";
import * as weapons from "../../data/weapon.json";
import * as monsters from "../../data/monsters.json";
import * as adventures from "../../data/adventures.json";
import * as proficienceLevels from "../../data/proficienceLevel.json";
import * as levels from "../../data/levels.json";
import { Shield } from "../interfaces/shield.js";
import { Weapon } from "../interfaces/weapon.js";
import { Adventure } from "../interfaces/adventure.js";
import { Monster } from "../interfaces/monster.js";
import { Level } from "../interfaces/level.js";

/**
 * Class with static method for search of data in json files
 */
export class JsonHandle {
  /**
   * Based in a json file and a data indetifier, get the data and returns it
   * @param imp import of data. I.e: import * as weapons from "./weapon.json"
   * @param dataId identifier of the data. i.e:
   *
   * file path: "./test.json"
   * ```
   * {
   *  "1": {
   *    "value": "example"
   *   }
   * }
   *
   * export type Test = {
   *  value: string
   * }
   *
   * //Import the file
   * import * as testFile from "./test.json";
   *
   * const data = genericDataGetById<Test>(testFile, 1);
   *
   * data = {value: example};
   * ```
   */
  public static genericDataGetById<T>(imp: ImportMeta, dataId: number): T {
    const data: T = imp[dataId];
    if (data !== undefined) {
      if ("id" in data) {
        data["id"] = dataId;
      }
      return data;
    }
    console.error(`${dataId} do not correpond to any ${typeof data} id`);
    throw new Error(`${typeof data} not exists`);
  }

  public static getAllShieldS(): Array<Shield> {
    const array: Array<Shield> = new Array<Shield>();

    for (const obj in shields) {
      const shield: Shield = shields[obj];
      array.push({
        defence: shield.defence,
        id: obj,
        name: shield.name,
        price: shield.price
      });
    }
    return array;
  }

  public static getAllWeapons(): Array<Weapon> {
    const array: Array<Weapon> = new Array<Weapon>();

    for (const obj in weapons) {
      const weapon: Weapon = weapons[obj];
      array.push({
        damage: weapon.damage,
        id: obj,
        name: weapon.name,
        price: weapon.price
      });
    }
    return array;
  }

  public static getAllAdventures(): Array<Adventure> {
    const array: Array<Adventure> = new Array<Adventure>();

    for (const obj in weapons) {
      const adventure: Adventure = adventures[obj];
      array.push({
        id: obj,
        idMonster: adventure.idMonster,
        level: adventure.level,
        name: adventure.name
      });
    }
    return array;
  }

  public static getAllMonsters(): Array<Monster> {
    const array: Array<Monster> = new Array<Monster>();

    for (const obj in weapons) {
      const monster: Monster = monsters[obj];
      array.push({
        id: obj,
        damage: monster.damage,
        givedGold: monster.givedGold,
        givedXp: monster.givedXp,
        hp: monster.hp,
        level: monster.level,
        name: monster.name,
        shield: monster.shield
      });
    }
    return array;
  }

  public static getShieldById(shieldId: number): Shield {
    const data = JsonHandle.genericDataGetById<Shield>(shields, shieldId);
    data.id = shieldId.toString();
    return data;
  }

  public static getWeaponById(weaponId: number): Weapon {
    const data = JsonHandle.genericDataGetById<Weapon>(weapons, weaponId);
    data.id = weaponId.toString();
    return data;
  }

  public static getAdventureById(adventureId: number): Adventure {
    const data = JsonHandle.genericDataGetById<Adventure>(
      adventures,
      adventureId
    );
    data.id = adventureId.toString();
    return data;
  }

  public static getMonsterById(monsterId: number): Monster {
    const data = JsonHandle.genericDataGetById<Monster>(monsters, monsterId);
    data.id = monsterId.toString();
    return data;
  }

  public static getProficienceById(proficienceId: number): Level {
    const data = JsonHandle.genericDataGetById<Level>(
      proficienceLevels,
      proficienceId
    );
    data.value = proficienceId;
    return data;
  }

  public static getLevelById(level: number): Level {
    const data = JsonHandle.genericDataGetById<Level>(levels, level);
    data.value = level;
    return data;
  }
}
