import * as Discord from "discord.js";
import { Adventure } from "../interfaces/adventure";

import * as adventures from "../../data/adventures.json";
import { getTimeStampFormated } from "../utils/time";
import { EXPLORATION_MAX_LEVEL, PREFIX } from "../utils/global";
import { getHeroRepository } from "../utils/repositoryHandler";

/**
 * Send user user to farm(Get gold, xp, and equips)
 * @since 0.1
 * @param msg Discord last message related to the command
 * @param level difficult of the farm field. How bigger the number, harder is the field.
 * The amount of gold, xp received by the user increases according to the value of the level
 */
export async function explore(msg: Discord.Message, level: number) {
  if (level > 0 && level <= EXPLORATION_MAX_LEVEL) {
    try {
      const heroRepository = getHeroRepository();
      const hero = await heroRepository.findbyId(msg.author.id);

      if (hero !== null) {
        const adv: Adventure = adventures[level];

        if (adv === undefined) {
          msg.channel.send("Hmmm, the informed adventure does not exist ");
          return;
        }

        const playStatus = await hero.playStatus;
        let heroAdventure = await playStatus.adventure;

        if (heroAdventure === null) {
          heroAdventure = adv;
          hero.adventureStartedTime = getTimeStampFormated();

          heroService.updateHero(hero).then(() => {
            msg.channel.send("Send hero to explore " + adv.name) +
              ". Good Farmning!";
          });
        } else {
          msg.channel.send(
            "You is already exploring. Say `" +
              PREFIX +
              "status` to see how your hero is goin on"
          );
        }
      }
    } catch (error) {}
  } else {
    msg.channel.send(
      "You must choose a number between 1 and " +
        EXPLORATION_MAX_LEVEL +
        " to send your "
    );
  }
}
