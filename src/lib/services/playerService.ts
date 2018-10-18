import { BaseEntityService } from "../services/baseEntityService";
import { Player } from "../interfaces/player";
import { Monster } from "../interfaces/monster";
import { randomNumber } from "../utils/random";
import { getTimeStampFormated, getTime } from "../utils/time";
import { ProficienceType } from "../enums/proficienceType";
import { Action } from "../enums/action";
import { Proficience } from "../interfaces/proficience";
import * as Discord from "discord.js";
import { type } from "os";
import { PlayStatus } from "../interfaces/playStatus";
import { PlayerDieError } from "../errors/PlayerDieError";

class PlayerService extends BaseEntityService<Player> {
  private route = "/players";

  createPlayer(player: Player): Promise<void> {
    return super.set(this.route + "/" + player.id, player);
  }

  findbyUserID(id: string): Promise<Player> {
    return super.find(this.route, id).then(player => {
      return new Promise<Player>(resolve => {
        const playerGet: Player = player;
        if (player !== null) playerGet.id = id;
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
    return Math.pow(damage + bonus / 2, 2);
  }

  /**
   * Return the total amount of defence
   */
  playerDefence(player: Player): number {
    return this.calcDefence(
      player.shield.defence,
      player.shieldProficience.level
    );
  }

  /**
   * Calculate the percentage of damage that will be reduced from an atack.
   * Defence is based in percentage
   * @param defence armo
   * @param bonus proficience
   */
  private calcDefence(defence: number, bonus?: number): number {
    return defence + (bonus / 10) * 5;
  }

  /**
   * Calculate the amount of hp will be taken from an atack based in a defence
   * @param damage value(calculated) of damage that the atacker will give
   * @param defence value(%) that will be reduced from the atack
   */
  calcDamageTaken(damage: number, defence: number): number {
    return (defence * damage) / 100;
  }

  /**
   * Reduces monster's life based in player attack value
   * @param player who will atack the monster
   * @param monster the monster that will be attacked
   */
  attackMonster(player: Player, monster: Monster) {
    monster.hp =
      monster.hp -
      this.calcDamageTaken(
        this.playerDamage(player),
        this.calcDefence(monster.shield)
      );
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
    } else {
      proficience = player.shieldProficience;
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

  updatePlayerTraining(player: Player) {
    this.calcPlayerTrainingBase(player, false);
  }

  finishPlayerTraining(player: Player) {
    this.calcPlayerTrainingBase(player, true);
  }

  /**
   * Calcs what the player got in exploration.
   * @param player Who will have him bounts calculated
   * @param finishTraning Defines if the training must end (then the value that store when the
   * player started training is set to 'undefined') or updated (then the value that store when
   * the player started training is set to the value in 'getTimeStampFormated()' method
   * @return Result of player exploration
   * @throws Error of type PlayStatus meaning that the player died in exploration
   */
  private calcPlayerTrainingBase(
    player: Player,
    finishTraning: boolean
  ): PlayStatus {
    // time in seconds that the player is training
    let timeTrained: number;
    timeTrained = getTimeStampFormated() - player.adventureStartedTime;
    const monster = player.adventure.monster;
    const fullMonsterHp = player.adventure.monster.hp;

    let xpEarned = 0;
    let goldEarned = 0;
    let monstersKilled = 0;

    const time = getTimeStampFormated() - player.adventureStartedTime;

    // Each value is a second, each second is a hit.
    // MUST REFATORE (Remove the loop and make the calc based in the timeTrained)
    for (let i = 0; i <= timeTrained; i++) {
      playerService.attackMonster(player, monster);

      if (monster.hp <= 0) {
        xpEarned += monster.givedXp;
        goldEarned += monster.givedGold;
        monstersKilled++;
        monster.hp = fullMonsterHp;
      }

      playerService.defendAttack(player, monster);

      if (player.hpActual <= 0) {
        player.deaths++;
        player.monstersKilled += monstersKilled;
        player.gold += goldEarned;

        player.adventureStartedTime = undefined;
        player.actionStatus = undefined;

        throw new PlayerDieError({
          action: Action.EXPLORING,
          exp: xpEarned,
          time: time,
          gold: goldEarned,
          monstersKilled: monstersKilled
        });
      }
    } // Player didn't dead in exploration

    player.actionStatus = {
      action: Action.EXPLORING,
      gold: goldEarned,
      monstersKilled: monstersKilled,
      exp: xpEarned,
      time: getTimeStampFormated()
    };

    if (finishTraning) {
      player.adventureStartedTime = undefined;
    } else {
      player.adventureStartedTime = getTimeStampFormated();
    }

    this.updatePlayer(player);

    return {
      action: Action.EXPLORING,
      exp: xpEarned,
      time: time,
      gold: goldEarned,
      monstersKilled: monstersKilled
    };

    /*    msg.channel.send(
      "You killed " +
        monstersKilled +
        " monsters. Got " +
        goldEarned +
        " of gold and " +
        xpEarned +
        " of experience. You explored for " +
        getTime(time)
    ); */
  }
}

export const playerService: PlayerService = new PlayerService();
