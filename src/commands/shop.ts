import * as Discord from "discord.js";
import { equipServ } from "../lib/services/equipService";
/**
 * Informs all available items from selected type.
 * @param msg Discord last message related to the command
 */

export function shop(msg: Discord.Message) {
  msg.channel.send("Want to buy sword or shield ?").then(() => {
    msg.channel
      .awaitMessages(responseName => responseName.author.id === msg.author.id, {
        max: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(getItemType => {
        const itemTypeName = getItemType.first().content;
        const items = equipServ.findAllItens(itemTypeName);
        msg.channel.send(items);
      });
  });
}
