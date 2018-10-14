import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";
import {
  getTimeStampFormated,
  getTime,
  getTimeDifference
} from "../lib/utils/time";
import * as proficienceLevel from "../../data/proficienceLevel.json";
import { Player } from "../lib/interfaces/player";
import { randomNumber } from "../lib/utils/random";

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
      timeTrained = getTimeDifference(
        getTimeStampFormated(),
        player.adventureStartedTime
      );
      const monster = player.adventure.monster;
      const fullMonsterHp = player.adventure.monster.hp;

      let xpEarned = 0;
      let goldEarned = 0;
      let monstersKilled = 0;

      const time = getTimeDifference(
        getTimeStampFormated(),
        player.adventureStartedTime
      );

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
      }
      msg.channel.send(
        "You killed " +
          monstersKilled +
          " monsters. Got " +
          goldEarned +
          " of gold and " +
          xpEarned +
          " of experience. You explored for " +
          getTime(time * 60)
      );

      player.adventureStartedTime = getTimeStampFormated();
    } else if (player.trainDamageStartedTime !== undefined) {
      const trained = updatePlayerProficienceDamage(player);

      msg.channel.send(
        `The player ${player.name} is training damage for ${getTime(
          trained
        )}.` +
          ` Your damage proficience level is ${player.damageProficience.level}`
      );
    } else {
      const trained = updatePlayerProficienceShield(player);

      msg.channel.send(
        `The player ${player.name} is training shield for ${getTime(
          trained * 60
        )}.` +
          ` Your shield proficience level is ${player.shieldProficience.level}`
      );
    }
    playerService.updatePlayer(player);
  });
}

/**
 * Calcs the amount of experience in damage proficience the player will get
 * @description It get the actual timestamp and subtract from the time that the player
 * started train.(The time is got in minutes and each minute is equal a random number between 5 an 20).
 * It also adjusts the level of proficiency if it increases
 * @example 1min = 5~20 exp points
 * @param player Who will have the damage proficience points calculated
 */
function updatePlayerProficienceDamage(player: Player): number {
  const timeTrained = getTimeDifference(
    getTimeStampFormated(),
    player.trainDamageStartedTime
  );

  let exp = generateExpTotal(timeTrained);
  let remain;
  let getProficience;

  const profXp = player.damageProficience.xp;
  const profMaxXp = player.damageProficience.levelMaxXp;

  while (exp > 0) {
    if (exp + profXp >= profMaxXp) {
      remain = exp + profXp - player.damageProficience.levelMaxXp;
      getProficience = proficienceLevel[player.damageProficience.level + 1];

      player.damageProficience = getProficience;
      player.damageProficience.xp = remain;
    } else {
      player.damageProficience.xp += exp;
      break;
    }
    exp = remain;
  }
  player.trainDamageStartedTime = getTimeStampFormated();
  return timeTrained;
}

/**
 * Calcs the amount of experience in shield proficience the player will get
 * @description It gets the actual timestamp and subtract from the time that the player
 * started train.(The time is got in minutes and each minute is equal a random number between 5 an 20).
 * It also adjusts the level of proficiency if it increases
 * @example 1min = 5~20 exp points
 * @param player Who will have the damage proficience points calculated
 */
function updatePlayerProficienceShield(player: Player): number {
  const timeTrained = getTimeDifference(
    getTimeStampFormated(),
    player.trainShieldStartedTime
  );

  let exp = generateExpTotal(timeTrained);
  let remain;
  let getProficience;

  const profXp = player.shieldProficience.xp;
  const profMaxXp = player.shieldProficience.levelMaxXp;

  while (exp > 0) {
    if (exp + profXp >= profMaxXp) {
      remain = exp + profXp - profMaxXp;
      getProficience = proficienceLevel[player.shieldProficience.level + 1];

      player.shieldProficience = getProficience;
      player.shieldProficience.xp = remain;
    } else {
      player.shieldProficience.xp += exp;
      break;
    }
    exp = remain;
  }
  player.trainShieldStartedTime = getTimeStampFormated();
  return timeTrained;
}

function generateExpTotal(exp: number): number {
  let total: number;
  for (let i = 0; i < exp; i++) {
    total += randomNumber(5, 20);
  }
  return total;
}
