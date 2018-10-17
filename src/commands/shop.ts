import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";

/**
 * Inform player's experience
 * @param msg Discord last message related to the command
 */
export function xp(msg: Discord.Message) {
  playerService.findbyUserID(msg.author.id).then(player => {
    if (player !== null) {
      const percentage = (player.xp * 100) / player.levelMaxXp;
      msg.channel.send(
        "You are current in level " +
          player.level +
          ". Your experience is " +
          player.xp +
          "/" +
          player.levelMaxXp +
          " (" +
          percentage +
          "%)"
      );
    }
  });
}
