import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";
import { PREFIX } from "../lib/util/consts";

/**
 * Removes a user's player
 * @param msg Discord last message related to the command
 */
export function deletePlayer(msg: Discord.Message) {
  playerService.findbyUserID(msg.author.id).then(player => {
    if (player === null) {

      msg.channel.send("You can not delete a player being that you haven't one");

    } else {
      msg.channel
        .send("Are you sure that want to delete your amazing character ?")
        .then(() => {
          msg.channel
            .awaitMessages(answer => msg.author.id === answer.author.id, {
              max: 1,
              time: 10000,
              errors: ["time"]
            }).then(answer => {
              const ans = answer.first().content;
              if (ans.toLowerCase() === "yes" || ans.toLowerCase() === "y") {
                const userId = msg.author.id;
                playerService.remove(userId).then(() => {
                  msg.channel.send(
                    `Player was removed with success. When you be ready to start again, tip ${PREFIX}create to make a new character`
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
  });
}