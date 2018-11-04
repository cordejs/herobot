import * as Discord from "discord.js";
import { heroService } from "../services/heroService";
/**
 * Shows hero's total amount of life
 * @param msg Discord last message related to the command
 */
export function hp(msg: Discord.Message) {
  heroService.findbyUserID(msg.author.id).then(hero => {
    if (hero !== null) {
      msg.channel.send(
        "Your current hp is " + hero.hpActual + " / " + hero.hpTotal
      );
    } else {
      msg.reply(" You don't seems to have a hero");
    }
  });
}
