import * as Discord from "discord.js";
import { getTime } from "../utils/time";
import { HeroDieError } from "../errors/heroDieError";
import heroService from "../services/heroService";

/**
 * Returns hero from exploration / training
 * @since 1.0
 * @param msg message caller
 */
export function back(msg: Discord.Message): void {
  heroService.findbyUserID(msg.author.id).then(hero => {
    if (hero === null) {
      msg.channel.send("You seems not to have a hero to call him back");
    } else if (
      hero.adventureStartedTime !== 0 ||
      hero.trainDamageStartedTime !== 0 ||
      hero.trainShieldStartedTime !== 0
    ) {
      try {
        const status = heroService.finishHeroTraining(hero);

        msg.channel.send(
          `You killed ${status.monstersKilled} monsters. ` +
          `Got ${status.gold} of gold and ${status.exp} of experience.` +
          ` You explored for ${getTime(status.time)}`
        );
      } catch (error) {
        // hero died in exploration
        const er: HeroDieError = error;
        msg.channel.send(er.message);
      }
    } else {
      msg.channel.send(
        "Well.. Your hero are not training or exploring. YOU HAVE TO DO SOMETHING ABOUT THIS"
      );
    }
  }).catch((error) => msg.channel.send(error));
}
