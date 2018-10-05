import { BaseEntityService } from "../services/baseEntityService";
import { Player } from "../interfaces/player";
import { ProficienceType } from "enums/proficienceType";
import { Proficience } from "interfaces/proficience";
import { HeroClass } from "enums/heroclass";

export class PlayerService extends BaseEntityService<Player> {
  private route = "/players";

  createPlayer(player: Player): Promise<void> {
    return super.set(this.route + "/" + player.id, player);
  }

  findbyUserID(id: string): Promise<Player> {
     return super.find(this.route, id);
  }

  remove(id: string): Promise<void> {
    return super.delete(this.route, id);
  }

  updatePlayer(player: Player) {
    return super.update(this.route, player);
  }

  /**
   * Return the total amount of damage that the player give
   */
  playerDamage(player: Player): number {
    return player.weapon.damage + player.damageProficience.level / 2;
  }

  /**
   * Return the total amount of defence
   */
  playerDefence(player: Player): number {
    return player.shield.defence + player.shieldProficience.level / 2;
  }

  /**
   * Create a new player object
   * @param name player's name
   * @param heroclass player's class
   * @param userID user's discord id
   */
  createObjectPlayer(name: string, heroclass: HeroClass, userID: string): Player {
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
}
