import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";

export function back(msg: Discord.Message): void {
  playerService.findbyUserID(msg.author.id).then(player => {
    if (player === null) {
      msg.channel.send("You seems not to have a hero to call him back");
    } else if (player.adventureStartedTime !== undefined) {
    } else if (player.trainDamageStartedTime !== undefined) {
    } else if (player.trainShieldStartedTime !== undefined) {
    } else {
      msg.channel.send(
        "Well.. Your hero are not training or exploring. YOU HAVE TO DO SOMETHING ABOUT THIS"
      );
    }
  });
}
