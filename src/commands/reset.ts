import * as Discord from "discord.js";
import heroService from "../services/heroService";
import { createHero } from "../commands/create";

/**
 * Reboot all informations about the user. Making him have the attributes values equals to someone that
 * just started the game.
 * @since 1.0
 * @see createObjecthero() at '*../interfaces/hero*'
 * @param msg Discord last message related to the command
 */
export function reset(msg: Discord.Message) {
  heroService.findbyUserID(msg.author.id).then(hero => {
    if (hero === null) {
      msg.channel
        .send(
          "Hmmm. Looks like that you haven't a character created. Would you like to " +
          +"create one now ?"
        )
        .then(() => {
          msg.channel
            .awaitMessages(answer => msg.author.id === answer.author.id, {
              max: 1,
              time: 10000,
              errors: ["time"]
            })
            .then(ans => {
              const response = ans
                .first()
                .content.trim()
                .toLowerCase();
              // Redirect user to hero creation function
              if (response === "y" || response === "yes") {
                createHero(msg);
              }
            });
        });
    } else {
      msg.channel
        .send("Are you sure that want to reset all your progress ?")
        .then(() => {
          msg.channel
            .awaitMessages(answer => msg.author.id === answer.author.id, {
              max: 1,
              time: 10000,
              errors: ["time"]
            })
            .then(answer => {
              const ans = answer
                .first()
                .content.trim()
                .toLowerCase();

              if (ans.toLowerCase() === "yes" || ans.toLowerCase() === "y") {
                hero.reset();
                heroService.updateHero(hero).then(() => {
                  msg.channel.send("hero `" + hero.name + "` reseted");
                });
              } else if (
                ans.toLowerCase() === "no" ||
                ans.toLowerCase() === "not"
              ) {
                msg.channel.send("Hmmm. Well done");
              } else {
                msg.channel.send(
                  "I don't know if it is a yes or a not, but i gonna understand it as a no." +
                  +" So your profile will not be reseted :)"
                );
              }
            });
        });
    }
  }).catch((error) => msg.channel.send(error));
}
