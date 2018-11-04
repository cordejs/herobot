import * as Discord from "discord.js";
import { playerService } from "../services/playerService";
/**
 * Shows player's total amount of life
 * @param msg Discord last message related to the command
 */
export function hp(msg: Discord.Message) {
  playerService.findbyUserID(msg.author.id).then(player => {
    if (player !== null) {
      msg.channel.send(
        "Your current hp is " + player.hpActual + " / " + player.hpTotal
      );
    } else {
      msg.reply(" You don't seems to have a player");
    }
  });
}
