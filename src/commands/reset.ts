import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";
import { createPlayer } from "../commands/create";
import { Player } from "../lib/interfaces/player";

/**
 * Reboot all informations about the user. Making him have the attributes values equals to someone that
 * just started the game.
 * @see createObjectPlayer() at '*../interfaces/player*'
 * @param msg Discord last message related to the command
 */
export function reset(msg: Discord.Message) {
  playerService.findbyUserID(msg.author.id).then(player => {
    if (player === null) {
      msg.channel.send("You can not reset a player being that you haven't one");
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
                const userId = msg.author.id;

                playerService.findbyUserID(userId).then(player => {
                  if (player === undefined) {
                    msg.channel
                      .send(
                        "Hmmm. Looks like that you haven't a character created. Would you like to " +
                          +"create one now ?"
                      )
                      .then(() => {
                        msg.channel
                          .awaitMessages(
                            answer => msg.author.id === answer.author.id,
                            {
                              max: 1,
                              time: 10000,
                              errors: ["time"]
                            }
                          )
                          .then(ans => {
                            const response = ans
                              .first()
                              .content.trim()
                              .toLowerCase();

                            if (response === "y" || response === "yes") {
                              createPlayer(msg);
                            }
                          });
                      });
                    // Player exists
                  } else {
                    const updatePlayer = new Player(
                      player.name,
                      player.heroClass,
                      player.id
                    );

                    playerService.updatePlayer(updatePlayer).then(() => {
                      msg.channel.send(
                        "Player `" + updatePlayer.name + "` reseted"
                      );
                    });
                  }
                });
              } else if (ans === "no" || ans === "n") {
                msg.channel.send("Well done");
              }
            });
        });
    }
  });
}