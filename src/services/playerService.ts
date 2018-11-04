import { BaseEntityService } from "../services/baseEntityService";
import { Player } from "../models/player";
import { Monster } from "../interfaces/monster";
import { getTimeStampFormated } from "../utils/time";
import { ProficienceType } from "../enums/proficienceType";
import { Action } from "../enums/action";
import { Proficience } from "../interfaces/proficience";
import { PlayStatus } from "../interfaces/playStatus";
import { PlayerDieError } from "../errors/playerDieError";
import { JsonHandle } from "../utils/JsonHandle";
import { randomNumber } from "../utils/random";

class PlayerService extends BaseEntityService<Player> {
  private route = "/players";

  createPlayer(player: Player): Promise<void> {
    return super.set(this.route + "/" + player.id, player);
  }

  findbyUserID(id: string): Promise<Player> {
    return super.find(this.route, id).then(player => {
      return new Promise<Player>(resolve => {
        let playerGet: Player;
        playerGet = player;
        if (player !== null) {
          playerGet = Object.assign(new Player(), player);
          playerGet.id = id;
        }
        resolve(playerGet);
      });
    });
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
    return this.calcDamage(
      player.weapon.damage,
      player.damageProficience.level
    );
  }

  /**
   * Calculate the total amount of damage that will be gived based in the damage value and bonus.
   * @param damage weapon
   * @param bonus proficience
   */
  private calcDamage(damage: number, bonus?: number): number {
    if (damage !== undefined) {
      if (bonus === undefined) bonus = 1;
      return Math.floor(Math.pow(damage + bonus / 2, 2));
    }
    return 0;
  }

  /**
   * Return the total amount of defence
   */
  playerDefence(player: Player): number {
    if (player !== undefined) {
      return this.calcDefence(
        player.shield.defence,
        player.shieldProficience.level
      );
    }
  }

  /**
   * Calculate the percentage of damage that will be reduced from an atack.
   * Defence is based in percentage
   * @param defence armo
   * @param bonus proficience
   */
  private calcDefence(defence: number, bonus?: number): number {
    if (defence !== undefined) {
      if (bonus === undefined) bonus = 1;
      return Math.floor(defence + (bonus / 10) * 5);
    }
    return 0;
  }

  /**
   * Calculate the amount of hp will be taken from an atack based in a defence
   * @param damage value(calculated) of damage that the atacker will give
   * @param defence value(%) that will be reduced from the atack
   */
  calcDamageTaken(damage: number, defence: number): number {
    if (damage !== undefined && defence !== undefined) {
      return Math.floor((defence * damage) / 100);
    }
  }

  /**
   * Reduces monster's life based in player attack value
   * @param player who will atack the monster
   * @param monster the monster that will be attacked
   */
  attackMonster(player: Player, monster: Monster) {
    if (player !== undefined && monster !== undefined) {
      monster.hp =
        monster.hp -
        this.calcDamageTaken(
          this.playerDamage(player),
          this.calcDefence(monster.shield)
        );
    }
  }

  /**
   * Reduces player's life based in a monster attack value
   * @param player who will defend monster attack
   * @param monster monster who will atack player
   */
  defendAttack(player: Player, monster: Monster) {
    player.hpActual =
      player.hpActual -
      this.calcDamageTaken(
        this.calcDamage(monster.damage),
        this.playerDamage(player)
      );
  }

  /**
   * Calcs the amount of experience in Shield or Damage proficience the player will get
   * @description It gets the actual timestamp and subtract from the time that the player
   * started train.(The time is got in minutes and each minute is equal a random number between 5 an 20).
   * It also adjusts the level of proficiency if it increases
   * @example 1min = 5~20 exp points
   * @param player Who will have the proficience points calculated
   */
  upgradeProficience(player: Player) {
    let proficience: Proficience;

    if (player.trainDamageStartedTime !== undefined) {
      proficience = player.damageProficience;
    } else if (player.trainShieldStartedTime !== undefined) {
      proficience = player.shieldProficience;
    } else {
      return;
    }

    let timeTrained;

    if (player.actionStatus === undefined) {
      timeTrained = getTimeStampFormated() - player.trainShieldStartedTime;

      player.actionStatus = {
        action: Action.SHIELD_TRAINING,
        exp: 0,
        time: getTimeStampFormated()
      };

      if (proficience.type === ProficienceType.DAMAGE) {
        player.actionStatus.action = Action.DAMAGE_TRAINING;
      }
      // If the user alredy invoked the command "status"
    } else {
      timeTrained = getTimeStampFormated() - player.actionStatus.time;
    }

    const exp = this.generateExpTotal(timeTrained);

    player.actionStatus.exp += exp;
    player.actionStatus.time = getTimeStampFormated();

    return getTimeStampFormated() - player.trainShieldStartedTime;
  }

  /**
   * Calcs the amount of exp the player will receive in the given time and
   * convert it to minutes.
   * @param exp Time to calculate the exp. The value must be in TimeStamp
   * without milliseconds
   */
  generateExpTotal(exp: number): number {
    exp = Math.floor((exp / 60) % 60);
    let total: number = 0;
    for (let i = 0; i < exp; i++) {
      total += randomNumber(5, 20);
    }
    return total;
  }

  /**
   * Updated playstatus.time with the actual timestamp and calcs user training bounties
   * @throws PlayerDieError if the player died in exploration
   */
  updatePlayerTraining(player: Player): PlayStatus {
    return this.calcPlayerTrainingBase(player, false);
  }

  /**
   * Set the adventureStarted time with undefined and calcs user training bounties
   * @throws PlayerDieError if the player died in exploration
   */
  finishPlayerTraining(player: Player): PlayStatus {
    return this.calcPlayerTrainingBase(player, true);
  }

  /**
   * Calcs what the player got in exploration.
   * @param player Who will have him bounts calculated
   * @param finishTraning Defines if the training must end (then the value that store when the
   * player started training is set to 'undefined') or updated (then the value that store when
   * the player started training is set to the value in 'getTimeStampFormated()' method
   * @return Result of player exploration
   * @throws PlayerDieError of type PlayStatus meaning that the player died in exploration
   */
  private calcPlayerTrainingBase(
    player: Player,
    finishTraning: boolean
  ): PlayStatus {
    const monster = JsonHandle.getMonsterById(player.adventure.idMonster);
    const fullMonsterHp = monster.hp;

    let time;
    if (player.actionStatus === null) {
      time = getTimeStampFormated() - player.adventureStartedTime;

      player.actionStatus = {
        action: Action.EXPLORING,
        gold: 0,
        monstersKilled: 0,
        exp: 0,
        time: 0
      };
    } else {
      time = getTimeStampFormated() - player.actionStatus.time;
    }

    const timeTrained = time;

    // Each value is a second, each second is a hit.
    // MUST REFATORE (Remove the loop and make the calc based in the timeTrained)
    for (let i = 0; i <= timeTrained; i++) {
      // Player always hit the monster first
      playerService.attackMonster(player, monster);

      if (monster.hp <= 0) {
        player.actionStatus.exp += monster.givedXp;
        player.actionStatus.gold += monster.givedGold;
        player.actionStatus.monstersKilled++;
        monster.hp = fullMonsterHp;
      }

      playerService.defendAttack(player, monster);

      // Player died in exploration, so the number of gold, exp, monsters killed and
      // death is setted in his profile.
      if (player.hpActual <= 0) {
        player.deaths++;
        player.monstersKilled += player.actionStatus.monstersKilled;
        player.gold += player.actionStatus.gold;
        player.xp += player.actionStatus.exp;

        const status: PlayStatus = {
          action: Action.EXPLORING,
          exp: player.actionStatus.exp,
          time: time,
          gold: player.actionStatus.gold,
          monstersKilled: player.actionStatus.monstersKilled
        };

        player.adventureStartedTime = 0;
        player.actionStatus = null;

        this.updatePlayer(player);
        throw new PlayerDieError(status);
      }
    } // Player didn't dead in exploration

    player.actionStatus.time = getTimeStampFormated();

    if (finishTraning) {
      player.adventureStartedTime = 0;
      player.actionStatus = null;
    } else {
      player.actionStatus.time = getTimeStampFormated();
    }

    this.updatePlayer(player);

    const statusPlayer: PlayStatus = player.actionStatus;
    statusPlayer.time = time;

    return statusPlayer;
  }
}

export const playerService: PlayerService = new PlayerService();
