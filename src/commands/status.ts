import * as Discord from "discord.js";
import { heroService } from "../services/heroService";
import { getTime } from "../utils/time";
import { HeroDieError } from "../errors/heroDieError";

/**
 * Inform the situation of the hero in his exploration or trainning
 * @since 1.0
 * @param msg Discord last message related to the command
 */
export function status(msg: Discord.Message) {
  heroService.findbyUserID(msg.author.id).then(hero => {
    if (hero === null) {
      msg.channel.send("Create a hero before check his `status`");
      return;
    }
    // hero in exploration
    if (hero.adventureStartedTime !== 0) {
      try {
        const status = heroService.updateHeroTraining(hero);

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
      // hero training damage
    } else if (hero.trainDamageStartedTime !== 0) {
      const trained = heroService.upgradeProficience(hero);

      msg.channel.send(
        `The hero ${hero.name} is training damage for ${getTime(trained)}.` +
          ` You alredy got ${hero.actionStatus.exp} exp`
      );
      // hero training shield
    } else if (hero.trainShieldStartedTime !== 0) {
      const trained = heroService.upgradeProficience(hero);

      msg.channel.send(
        `The hero ${hero.name} is training shield for ${getTime(trained)}.` +
          ` You alredy got ${hero.actionStatus.exp} exp`
      );
    } else {
      msg.channel.send("You are not exploring or training.");
      return;
    }
    heroService.updateHero(hero);
  });
}
