import * as Discord from "discord.js";
import * as connections from "./../connection";
import { HeroClass } from "./enums/heroclass";
import { PlayerService } from "./services/playerService";
import { Player } from "./models/player";

/**
 * Bot commands:
 * @function create Creates a new User. Needs to informn the name and the class
 * @function profile TO DO -> Shows user's profile
 * @function delete TO DO -> Removes user's player
 *
 * @function reset TO DO -> Reset all user's informations
 * @function xp TO DO -> Shows user's actual experience
 * @function level TO DO -> Shows user's actual level
 *
 * @function gold TO DO -> shows user's actual gold
 * @function train TO DO -> Sends user's player to train a specific proficience(Damage or Defence)
 */
const client = new Discord.Client();
const prefix = "_";
const playerService: PlayerService = new PlayerService();

client.on("ready", () => {
  console.log(`Ready for play! ${client.user.tag}!`);
});

client.on("message", async msg => {
  // Ignoring others bots
  if (msg.author.bot) return;
  // Checking if the command has the prefix
  if (!msg.content.startsWith(prefix, 0)) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "create" || command === "c") createPlayer(msg);
});

client.login(connections.SuperSecretDiscordToken.token);

/**
 * Create a new user selecting a name and a class for him.
 * @param msg
 */
export function createPlayer(msg: Discord.Message) {
  // First ask for player's name
  msg.channel.send("What is your player name ?").then(() => {
    // The user has 10 seconds to answer before creation procedure be canceled
    msg.channel.awaitMessages(responseName => responseName.author.id === msg.author.id, {
        max: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(getName => {
        const playerName = getName.first().content;

        if (playerName === undefined || playerName.trim() === "") {
          msg.channel.send("You can not create a player without name :(. I know that you exists");
        } else {
          msg.channel.send("Hello " + playerName + ". What is your class ?")
            .then(() => {
              msg.channel.awaitMessages(
                  classResponse => classResponse.author.id === msg.author.id, {
                    max: 1,
                    time: 10000,
                    errors: ["time"]
                  }).then(getClass => {
                  const className = getClass.first().content;
                  if (
                    className.trim().toUpperCase() === HeroClass.HUNTER.toUpperCase() ||
                    className.trim().toUpperCase() === HeroClass.MAGE.toUpperCase() ||
                    className.trim().toUpperCase() === HeroClass.THIEF.toUpperCase() ||
                    className.trim().toUpperCase() === HeroClass.WARRIOR.toUpperCase()
                  ) {
                    msg.channel.send("You're now a " + className);

                    playerService.create(new Player(playerName, getHeroClass(className.toString())));
                  }
                }).catch(() => msg.channel.send("You said your name, but not witch class you wanna be. We can not" +
                 "create a player for you in that way"));
            });
        }
      }).catch(() => msg.channel.send("Player creation cancelled beause you are not speaking to me :("));
  });
}

function getHeroClass(className: string): HeroClass {
  if (className.trim().toUpperCase() === HeroClass.HUNTER.toUpperCase()) return HeroClass.HUNTER;
  else if (className.trim().toUpperCase() === HeroClass.MAGE.toUpperCase()) return HeroClass.MAGE;
  else if (className.trim().toUpperCase() === HeroClass.THIEF.toUpperCase()) return HeroClass.THIEF;
  else if (className.trim().toUpperCase() === HeroClass.WARRIOR.toUpperCase()) return HeroClass.WARRIOR;
}