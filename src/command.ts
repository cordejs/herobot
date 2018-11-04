import { createPlayer } from "./commands/create";
import { profile } from "./commands/profile";
import * as Discord from "discord.js";

import { deletePlayer } from "./commands/delete";
import { reset } from "./commands/reset";
import { xp } from "./commands/xp";

import { gold } from "./commands/gold";
import { explore } from "./commands/explore";
import { PREFIX } from "./utils/consts";
import { train } from "./commands/train";
import { status } from "./commands/status";
import { back } from "./commands/back";
import { shop } from "./commands/shop";
import { hp } from "./commands/hp";

/**
 * Receives a message, treating it and sending to the right method
 * @param msg message sent by Discord
 */
export function commandHandle(msg: Discord.Message) {
  const args = msg.content
    .slice(PREFIX.length)
    .trim()
    .split(/ +/g);

  const command = args[0].toLowerCase();

  if (command === "create" || command === "c") createPlayer(msg);
  else if (command === "profile" || command === "p") profile(msg);
  else if (command === "shop" || command === "shp") shop(msg);
  else if (command === "delete" || command === "d") deletePlayer(msg);
  else if (command === "reset" || command === "r") reset(msg);
  else if (command === "shop" || command === "shp") shop(msg);
  else if (command === "experience" || command === "exp" || command === "xp")
    xp(msg);
  else if (command === "gold" || command === "g" || command === "money")
    gold(msg);
  else if (command === "explore" || command === "e") explore(msg, +args[1]);
  else if (command === "train" || command == "t") train(msg, args[1]);
  else if (command === "status" || command === "s") status(msg);
  else if (command === "back" || command === "b") back(msg);
  else if (command === "hp" || command === "life" || command === "h") hp(msg);
  else {
    msg.reply(" I didn't understand what do you mean");
  }
}
