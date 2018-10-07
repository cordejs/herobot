import { BaseEntityService } from "../services/baseEntityService";
import { Player } from "../interfaces/player";
import { ProficienceType } from "../enums/proficienceType";
import { Proficience } from "../interfaces/proficience";
import { HeroClass } from "../enums/heroclass";
import { Monster } from "../interfaces/monster";

class PlayerService extends BaseEntityService<Player> {
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
    return this.calcDamage(player.weapon.damage, player.damageProficience.level);
  }

  /**
   * Calculate the total amount of damage that will be gived based in the damage value and bonus.
   * @param damage weapon
   * @param bonus proficience
   */
  private calcDamage(damage: number, bonus?: number): number {
    return Math.pow((damage + bonus / 2), 2);
  }

  /**
   * Return the total amount of defence
   */
  playerDefence(player: Player): number {
    return this.calcDefence(player.shield.defence, player.shieldProficience.level);
  }

  /**
   * Calculate the percentage of damage that will be reduced from an atack.
   * Defence is based in percentage
   * @param defence armo
   * @param bonus proficience
   */
  private calcDefence(defence: number, bonus?: number): number {
    return defence + bonus / 10 * 5;
  }

  /**
   * Calculate the amount of hp will be taken from an atack based in a defence
   * @param damage value(calculated) of damage that the atacker will give
   * @param defence value(%) that will be reduced from the atack
   */
  calcDamageTaken(damage: number, defence: number): number {
    return defence * damage / 100;
  }

  /**
   * Reduces monster's life based in player attack value
   * @param player who will atack the monster
   * @param monster the monster that will be attacked
   */
  attackMonster(player: Player, monster: Monster) {
    monster.hp = monster.hp - this.calcDamageTaken(this.playerDamage(player), this.calcDefence(monster.shield));
  }

  /**
   * Reduces player's life based in a monster attack value
   * @param player who will defend monster attack
   * @param monster monster who will atack player
   */
  defendAttack(player: Player, monster: Monster) {
    player.hpActual = player.hpActual - this.calcDamageTaken(this.calcDamage(monster.damage), this.playerDamage(player));
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
      deaths: 0,
      monstersKilled: 0,
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

export const playerService: PlayerService = new PlayerService();