import * as Discord from "discord.js";
import { PREFIX } from "../utils/global";
import heroService from "../services/heroService";

/**
 * Removes a user's hero
 * @since 0.1
 * @param msg Discord last message related to the command
 */
export function deletehero(msg: Discord.Message) {
  heroService.findbyUserID(msg.author.id).then(hero => {
    if (hero === null) {
      msg.channel.send("You can not delete a hero being that you haven't one");
    } else {
      msg.channel
        .send("Are you sure that want to delete your amazing character ?")
        .then(() => {
          msg.channel
            .awaitMessages(answer => msg.author.id === answer.author.id, {
              max: 1,
              time: 10000,
              errors: ["time"]
            })
            .then(answer => {
              const ans = answer.first().content;
              if (ans.toLowerCase() === "yes" || ans.toLowerCase() === "y") {
                const userId = msg.author.id;
                heroService.remove(userId).then(() => {
                  msg.channel.send(
                    `hero was removed with success. When you be ready to start again, tip ${PREFIX}create to make a new character`
                  );
                });
              } else if (
                ans.toLowerCase() === "no" ||
                ans.toLowerCase() === "n"
              ) {
                msg.channel.send("We're so happy that you don't give up :)");
              }
            });
        });
    }
  }).catch((error) => msg.channel.send(error));
}
