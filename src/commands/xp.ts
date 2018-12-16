import * as Discord from "discord.js";
import heroService from "../services/heroService";

/**
 * Inform hero's experience
 * @since 1.0
 * @param msg Discord last message related to the command
 */
export function xp(msg: Discord.Message) {
  heroService.findbyUserID(msg.author.id).then(hero => {
    if (hero !== null) {
      const percentage = (hero.xp * 100) / hero.levelMaxXp;
      msg.channel.send(
        "You are current in level " +
        hero.level +
        ". Your experience is " +
        hero.xp +
        "/" +
        hero.levelMaxXp +
        " (" +
        percentage +
        "%)"
      );
    }
  }).catch((error) => msg.channel.send(error));
}
