import * as Discord from "discord.js";
import { heroService } from "../services/heroService";
import { weaponShop } from "./weaponShop";
import { shieldShop } from "./shieldShop";
/**
 * Informs all available items from selected type.
 * @param msg Discord last message related to the command
 */

export function shop(msg: Discord.Message) {
  heroService.findbyUserID(msg.author.id).then(hero => {
    if (hero === null) {
      msg.channel.send("Create a hero before check the shop ");
      return;
    }

    msg.channel.send("Want to buy sword or shield ?").then(() => {
      msg.channel
        .awaitMessages(
          responseName => responseName.author.id === msg.author.id,
          {
            max: 1,
            time: 10000,
            errors: ["time"]
          }
        )
        .then(response => {
          const type = response
            .first()
            .content.toLocaleLowerCase()
            .trim();
          if (type === "shield") {
            shieldShop(msg, hero);
          } else if (type === "sword") {
            weaponShop(msg, hero);
          }
        });
    });
  });
}
