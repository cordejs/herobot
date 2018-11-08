import * as Discord from "discord.js";
import { ProficienceType } from "../enums/proficienceType";
import { heroService } from "../services/heroService";
import { getTimeStampFormated } from "../utils/time";

/**
 * Sends hero to train a Proficience(Damage or Defence)
 * @since 1.0
 * @param msg User's message on discord
 */
export function train(msg: Discord.Message, proficience: string) {
  if (
    proficience !== undefined &&
    (proficience.toLowerCase() === ProficienceType.DAMAGE.toLowerCase() ||
      proficience.toLowerCase() === ProficienceType.SHIELD.toLowerCase())
  ) {
    heroService.findbyUserID(msg.author.id).then(hero => {
      if (hero === null) {
        msg.channel.send(
          "Your can not send your character to train being that you haven't one"
        );
      } else {
        if (proficience === ProficienceType.DAMAGE)
          hero.trainShieldStartedTime = getTimeStampFormated();
        else hero.trainShieldStartedTime = getTimeStampFormated();

        heroService
          .updateHero(hero)
          .then(() => msg.channel.send("hero successfully sent to train"))
          .catch(error => {
            console.log("train method error: " + error);
            msg.channel.send(
              "Hmmm. looks like that we have some technical problems. " +
                "Your character won't sent to train"
            );
          });
      }
    });
  } else {
    msg.channel.send(
      "Please, you must choose train your `damage` or your `shield`"
    );
  }
}
