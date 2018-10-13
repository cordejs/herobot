import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";
import { getTimeStampFormated, getTime } from "../lib/util/time";
import * as proficienceLevel from "../../data/proficienceLevel.json";
import { Player } from "../lib/interfaces/player";

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

    if (player.adventureStartedTime !== null) {
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
          getTime(time)
      );
    } else if (player.trainDamageStartedTime !== null) {
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
          trained
        )}.` +
          ` Your shield proficience level is ${player.shieldProficience.level}`
      );
    }
  });
}

function updatePlayerProficienceDamage(player: Player): number {
  const timeTrained = getTimeStampFormated() - player.trainDamageStartedTime;

  let exp = timeTrained / 10;
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
  return timeTrained;
}

function updatePlayerProficienceShield(player: Player): number {
  const timeTrained = getTimeStampFormated() - player.trainShieldStartedTime;

  let exp = timeTrained / 10;
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
  return timeTrained;
}
