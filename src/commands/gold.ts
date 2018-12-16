import * as Discord from "discord.js";
import heroService from "../services/heroService";

/**
 * Shows hero's total amount of gold
 * @since 1.0
 * @param msg Discord last message related to the command
 */
export function gold(msg: Discord.Message) {
  heroService.findbyUserID(msg.author.id).then(hero => {
    if (hero !== null) {
      msg.channel.send("Your current gold is $" + hero.gold);
    }
  }).catch((error) => msg.channel.send(error));
}
