import * as Discord from "discord.js";
import * as connections from "../connection";
import { commandHandle } from "./lib/command";

import { PREFIX } from "./lib/utils/consts";

/**
 *
 * Bot commands:
 * @function create -> Creates a new User. Needs to informn the name and the class
 * @function profile -> Shows user's profile
 * @function delete -> Removes user's player
 *
 * @function reset -> Resets all user's informations
 * @function xp -> Shows user's actual experience
 * @function gold -> Shows user's actual gold
 *
 * @function train -> Sends user's player to train a specific proficience(Damage or Defence)
 * Here the user will only get proficience level. No xp or gold
 * @function explore -> Sends player to kill monsters. There he will receive xp, gold and equips
 * @function status TO DO -> Shows how the user's player is going in the exploration. It shows how long the player
 * is in the exploration, how much exp, gold and equips he received. Also shows his current level and hp
 *
 * @function shop TO DO -> Shows the equips for sell
 * @function buy TO DO -> Buys an equip by his ID
 * @function boosters TO DO -> Lists the boosters and his prices
 *
 * @function sell TO DO -> Sells a player's equip
 * @function help TO DO -> Inform all commands with their abreviations and description
 */

const client = new Discord.Client();

// Tell the world that we're ready!!
client.on("ready", () => {
  console.log(`Ready for play! ${client.user.tag}!`);
});

// Correspond to the receptor of all messages sent by the users in Discord
client.on("message", async msg => {
  // Ignoring others bots
  if (msg.author.bot) return;
  // Checking if the command has the prefix
  if (!msg.content.startsWith(PREFIX, 0)) return;

  commandHandle(msg);
});

// Creates the connection with Discord using (wisping: a secret token. u.u)
client.login(connections.SuperSecretDiscordToken.token);
