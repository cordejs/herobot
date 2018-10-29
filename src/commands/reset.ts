import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";
import { createPlayer } from "../commands/create";
import { Player } from "../lib/models/player";

/**
 * Reboot all informations about the user. Making him have the attributes values equals to someone that
 * just started the game.
 * @see createObjectPlayer() at '*../interfaces/player*'
 * @param msg Discord last message related to the command
 */
export function reset(msg: Discord.Message) {
  playerService.findbyUserID(msg.author.id).then(player => {
    if (player === null) {
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
              // Redirect user to player creation function
              if (response === "y" || response === "yes") {
                createPlayer(msg);
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
                player.reset();
                playerService.updatePlayer(player).then(() => {
                  msg.channel.send("Player `" + player.name + "` reseted");
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
  });
}
