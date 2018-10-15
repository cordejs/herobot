import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";
import { getTimeStampFormated, getTime } from "../lib/utils/time";

import { Player } from "../lib/interfaces/player";
import { randomNumber } from "../lib/utils/random";
import { Action } from "../lib/enums/action";

import { Proficience } from "../lib/interfaces/proficience";
import { ProficienceType } from "../lib/enums/proficienceType";

/**
 * Inform the situation of the player in his exploration or trainning
 * @param msg Discord last message related to the command
 */
export function status(msg: Discord.Message) {
  playerService.findbyUserID(msg.author.id).then(player => {
    if (player === null) {
      msg.channel.send("Create a player before check his `status`");
      return;
    }

    let timeTrained: number;

    if (player.adventureStartedTime !== undefined) {
      // time in seconds that the player is training
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

          playerService
            .updatePlayer(player)
            .then(() => {
              msg.channel.send(
                "You died after kill " +
                  monstersKilled +
                  " monsters. Got " +
                  goldEarned +
                  " of gold and " +
                  xpEarned +
                  " of experience. You explored for " +
                  getTime(time)
              );
            })
            .catch(error => {
              console.log(
                "Error when updating user after die in exploration. " + error
              );
              msg.channel.send(
                "Looks like that we found some problems to save your progress."
              );
            });
          break;
        }
      } // Player didn't dead in exploration

      msg.channel.send(
        "You killed " +
          monstersKilled +
          " monsters. Got " +
          goldEarned +
          " of gold and " +
          xpEarned +
          " of experience. You explored for " +
          getTime(time)
      );

      player.actionStatus = {
        action: Action.EXPLORING,
        gold: goldEarned,
        monstersKilled: monstersKilled,
        exp: xpEarned,
        time: getTimeStampFormated()
      };

      player.adventureStartedTime = getTimeStampFormated();
    } else if (player.trainDamageStartedTime !== undefined) {
      const trained = upgradeProficience(player);

      msg.channel.send(
        `The player ${player.name} is training damage for ${getTime(
          trained
        )}.` + ` You alredy got ${player.actionStatus.exp} exp`
      );
    } else {
      const trained = upgradeProficience(player);

      msg.channel.send(
        `The player ${player.name} is training shield for ${getTime(
          trained
        )}.` + ` You alredy got ${player.actionStatus.exp} exp`
      );
    }
    playerService.updatePlayer(player);
  });
}

/**
 * Calcs the amount of experience in Shield or Damage proficience the player will get
 * @description It gets the actual timestamp and subtract from the time that the player
 * started train.(The time is got in minutes and each minute is equal a random number between 5 an 20).
 * It also adjusts the level of proficiency if it increases
 * @example 1min = 5~20 exp points
 * @param player Who will have the proficience points calculated
 */
function upgradeProficience(player: Player) {
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

  const exp = generateExpTotal(timeTrained);

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
function generateExpTotal(exp: number): number {
  exp = Math.floor((exp / 60) % 60);
  let total: number = 0;
  for (let i = 0; i < exp; i++) {
    total += randomNumber(5, 20);
  }
  return total;
}
