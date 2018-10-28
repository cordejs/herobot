import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";
import { PlayerDieError } from "../lib/errors/PlayerDieError";
import { getTime } from "../lib/utils/time";

export function back(msg: Discord.Message): void {
  playerService.findbyUserID(msg.author.id).then(player => {
    if (player === null) {
      msg.channel.send("You seems not to have a hero to call him back");
    } else if (
      player.adventureStartedTime !== undefined ||
      player.trainDamageStartedTime !== undefined ||
      player.trainShieldStartedTime !== undefined
    ) {
      try {
        const status = playerService.finishPlayerTraining(player);

        msg.channel.send(
          `You back from your exploration in saefe. You killed ${status.monstersKilled} monsters. ` +
            `Got ${status.gold} of gold and ${status.exp} of experience.` +
            ` You explored for ${getTime(status.time)}`
        );
      } catch (error) {
        // Player died in exploration
        const er: PlayerDieError = error;
        msg.channel.send(er.message);
      }
    } else {
      msg.channel.send(
        "Well.. Your hero are not training or exploring."
      );
    }
  });
}
