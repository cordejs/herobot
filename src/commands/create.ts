import * as Discord from "discord.js";
import { getHeroClass } from "../lib/utils/classHandle";
import { playerService } from "../lib/services/playerService";
import { Player } from "../lib/models/player";

/**
 * Create a new user selecting a name and a class for him.
 * @param msg Discord last message related to the command
 */
export function createPlayer(msg: Discord.Message) {
  // First check if the user already have an player
  playerService.findbyUserID(msg.author.id).then(player => {
    if (player !== null) {
      msg.channel.send(
        "You already have a player created called `" + player.name + "`"
      );
    } else {
      // If haven't, ask for player's name
      msg.channel.send("What is your player name ?").then(() => {
        // The user has 10 seconds to answer before creation procedure be canceled
        msg.channel
          .awaitMessages(
            responseName => responseName.author.id === msg.author.id,
            {
              max: 1,
              time: 10000,
              errors: ["time"]
            }
          )
          .then(getName => {
            const playerName = getName.first().content;

            if (playerName === undefined || playerName.trim() === "") {
              msg.channel.send(
                "You can not create a player without name :(. I know that you exists"
              );
            } else {
              msg.channel
                .send("Hello " + playerName + ". What is your class ?")
                .then(() => {
                  msg.channel
                    .awaitMessages(
                      classResponse =>
                        classResponse.author.id === msg.author.id,
                      {
                        max: 1,
                        time: 10000,
                        errors: ["time"]
                      }
                    )
                    .then(getClass => {
                      const className = getClass.first().content;

                      if (getHeroClass(className) !== undefined) {
                        playerService
                          .createPlayer(
                            new Player(
                              playerName,
                              getHeroClass(className.toString()),
                              msg.author.id
                            )
                          )
                          .then(() =>
                            msg.channel.send("You're now a " + className)
                          )
                          .catch(error => {
                            console.log(
                              "Fail at player creation. Error: " + error
                            );
                            msg.channel.send(
                              "Wasn't possible to create your player"
                            );
                          });
                      } else {
                        msg.channel.send(
                          "You said your name, but not witch class you wanna be. We can not " +
                            "create a player for you in that way"
                        );
                      }
                    });
                });
            }
          })
          .catch(() =>
            msg.channel.send(
              "Player creation cancelled beause you are not speaking to me :("
            )
          );
      });
    }
  });
}
