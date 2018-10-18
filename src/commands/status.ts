import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";
import { getTimeStampFormated, getTime } from "../lib/utils/time";
import { Action } from "../lib/enums/action";
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
      playerService.updatePlayerTraining(player);
    } else if (player.trainDamageStartedTime !== undefined) {
      const trained = playerService.upgradeProficience(player);

      msg.channel.send(
        `The player ${player.name} is training damage for ${getTime(
          trained
        )}.` + ` You alredy got ${player.actionStatus.exp} exp`
      );
    } else {
      const trained = playerService.upgradeProficience(player);

      msg.channel.send(
        `The player ${player.name} is training shield for ${getTime(
          trained
        )}.` + ` You alredy got ${player.actionStatus.exp} exp`
      );
    }
    playerService.updatePlayer(player);
  });
}
