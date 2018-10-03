import * as Discord from "discord.js";
import * as connections from "../connection";
import { HeroClass } from "./enums/heroclass";
import { PlayerService } from "./services/playerService";
import { createObjectPlayer } from "./interfaces/player";

/**
 * Bot commands:
 * @function create -> Creates a new User. Needs to informn the name and the class
 * @function profile -> Shows user's profile
 * @function delete -> Removes user's player
 *
 * @function reset -> Reset all user's informations
 * @function xp DOING(NEED TEST)-> Shows user's actual experience
 * @function gold DOING(NEED TEST) -> shows user's actual gold
 *
 * @function train TO DO -> Sends user's player to train a specific proficience(Damage or Defence)
 * Here the user will only get proficience level. No xp or gold
 * @function explore TO DO -> sned player to kill monsters. There he will receive xp, gold and equips
 * @function shop TO DO -> see the equips for sell
 *
 * @function buy TO DO -> buy an equip by his ID
 * @function boosters TO DO -> lists the boosters and his prices
 * @function sell TO DO -> sell a player's equip
 */

const client = new Discord.Client();
const prefix = "_";
const playerService: PlayerService = new PlayerService();

/**
 * Tell the world that we're ready!!
 */
client.on("ready", () => {
  console.log(`Ready for play! ${client.user.tag}!`);
});

/**
 * Correspond to the receptor of all messages sent by the users in Discord
 */
client.on("message", async msg => {
  // Ignoring others bots
  if (msg.author.bot) return;
  // Checking if the command has the prefix
  if (!msg.content.startsWith(prefix, 0)) return;

  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const command = args.shift().toLowerCase();

  if (command === "create" || command === "c") createPlayer(msg);
  else if (command === "profile" || command === "p") profile(msg);
  else if (command === "delete" || command === "d") deletePlayer(msg);
  else if (command === "reset" || command === "r") reset(msg);
  else if (command === "xp") xp(msg);
  else if (command === "gold" || command === "g") gold(msg);
  else if (command === "farm" || (command === "f" && (args.length > 1 && isNaN(+args[1])))) farm(msg, +args[1]);
});

client.login(connections.SuperSecretDiscordToken.token);

/**
 * Create a new user selecting a name and a class for him.
 * @param msg Discord last message related to the command
 */
function createPlayer(msg: Discord.Message) {
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
                        msg.channel.send("You're now a " + className);
                        playerService.createPlayer(
                          createObjectPlayer(
                            playerName,
                            getHeroClass(className.toString()),
                            msg.author.id
                          )
                        );
                      }
                    })
                    .catch(error => {
                      console.log("Fail at player creation. Error: " + error);
                      msg.channel.send(
                        "You said your name, but not witch class you wanna be. We can not " +
                          "create a player for you in that way"
                      );
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

function getHeroClass(className: string): HeroClass {
  if (className.trim().toUpperCase() === HeroClass.HUNTER.toUpperCase())
    return HeroClass.HUNTER;
  else if (className.trim().toUpperCase() === HeroClass.MAGE.toUpperCase())
    return HeroClass.MAGE;
  else if (className.trim().toUpperCase() === HeroClass.THIEF.toUpperCase())
    return HeroClass.THIEF;
  else if (className.trim().toUpperCase() === HeroClass.WARRIOR.toUpperCase())
    return HeroClass.WARRIOR;
  return undefined;
}

/**
 * Shows player's profile
 * @param msg Discord last message related to the command
 */
function profile(msg: Discord.Message) {
  playerService.findbyUserID(msg.author.id).then(player => {
    msg.channel.send(
      "Name: " +
        player.name +
        "\n" +
        "Gold: $" +
        player.gold +
        "\n" +
        "Class: " +
        player.heroClass +
        "\n" +
        "Hp: " +
        player.hpActual +
        " / " +
        player.hpTotal +
        "\n" +
        "Level: " +
        player.level +
        "\n" +
        "Experience: " +
        player.xp +
        " / " +
        player.levelMaxXp +
        "\n" +
        "Damage proficience level: " +
        player.damageProficience.level +
        "\n" +
        "Damage proficience xp: " +
        player.damageProficience.xp +
        " / " +
        player.damageProficience.levelMaxXp +
        "\n" +
        "Shield proficience level: " +
        player.shieldProficience.level +
        "\n" +
        "Shield proficience xp: " +
        player.shieldProficience.xp +
        " / " +
        player.shieldProficience.levelMaxXp
    );
  });
}

/**
 * Removes a user's player
 * @param msg Discord last message related to the command
 */
function deletePlayer(msg: Discord.Message) {
  playerService.findbyUserID(msg.author.id).then(player => {
    if (player === null) {
      msg.channel.send(
        "You can not delete a player being that you haven't one"
      );
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
                playerService.remove(userId).then(() => {
                  msg.channel.send(
                    "Player was removed with success. When you be ready to start again, " +
                    +"tip " +
                    prefix +
                    "create to make a new character"
                  );
                });
              } else if (ans.toLowerCase() === "no" || ans.toLowerCase() === "n") {
                msg.channel.send("We're so happy that you don't give up :)");
              }
            });
        });
    }
  });
}

/**
 * Reboot all informations about the user. Making him have the attributes values equals to someone that
 * just started the game.
 * @see createObjectPlayer() at '*../interfaces/player*'
 * @param msg Discord last message related to the command
 */
function reset(msg: Discord.Message) {
  playerService.findbyUserID(msg.author.id).then(player => {
    if (player === null) {
      msg.channel.send(
        "You can not reset a player being that you haven't one"
      );
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
                        "Hmmm. Locks like that you haven't a character created. Would you like to " +
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

                    const updatePlayer = createObjectPlayer(
                      player.name,
                      player.heroClass,
                      player.id
                    );

                    playerService.updatePlayer(updatePlayer).then(() => {
                      msg.channel.send("Player `" + updatePlayer.name + "` reseted");
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

/**
 * Inform player's experience
 * @param msg Discord last message related to the command
 */
function xp(msg: Discord.Message) {
  playerService.findbyUserID(msg.author.id).then(player => {
    if (player !== undefined) {
      const percentage = (player.xp * 100) / player.levelMaxXp;
      msg.channel.send(
        "You are current in level " +
          player.level +
          ". Your experience is" +
          player.xp +
          "/" +
          player.levelMaxXp +
          " (" +
          percentage +
          "%)"
      );
    }
  });
}

/**
 * Shows player's total amount of gold
 * @param msg Discord last message related to the command
 */
function gold(msg: Discord.Message) {
  playerService.findbyUserID(msg.author.id).then(player => {
    if (player !== undefined) {
      msg.channel.send("Your current gold is " + player.gold);
    }
  });
}

/**
 * Send user user to farm(Get gold, xp, and equips)
 * @param msg Discord last message related to the command
 * @param level difficult of the farm field. How bigger the number, harder is the field.
 * The amount of gold, xp received by the user increases according to the value of the level
 */
function farm(msg: Discord.Message, level: number) {
  if (level > 0 && level <= 20) {
    playerService.findbyUserID(msg.author.id).then(player => {
      if (player !== undefined) {
        // TO DO
      }
    });
  }
}
