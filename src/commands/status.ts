import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";
import { getTime } from "../lib/utils/time";
import { PlayerDieError } from "../lib/errors/playerDieError";

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

    if (player.adventureStartedTime !== undefined) {
      try {
        const status = playerService.updatePlayerTraining(player);

        msg.channel.send(
          `You killed ${status.monstersKilled} monsters. ` +
            `Got ${status.gold} of gold and ${status.exp} of experience.` +
            ` You explored for ${getTime(status.time)}`
        );
      } catch (error) {
        // Player died in exploration
        const er: PlayerDieError = error;
        msg.channel.send(er.message);
      }
    } else if (player.trainDamageStartedTime !== undefined) {
      const trained = playerService.upgradeProficience(player);

      msg.channel.send(
        `The player ${player.name} is training damage for ${getTime(
          trained
        )}.` + ` You alredy got ${player.actionStatus.exp} exp`
      );
    } else if (player.trainShieldStartedTime !== undefined) {
      const trained = playerService.upgradeProficience(player);

      msg.channel.send(
        `The player ${player.name} is training shield for ${getTime(
          trained
        )}.` + ` You alredy got ${player.actionStatus.exp} exp`
      );
    } else {
      msg.channel.send("You are not exploring or training. DO SOMETHING");
      return;
    }
    playerService.updatePlayer(player);
  });
}
