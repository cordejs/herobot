import * as Discord from "discord.js";
import { heroService } from "../services/heroService";
import { reactionData } from "../utils/global";
import { Equipment } from "../interfaces/equipment";

/**
 * Buy a equip from store
 * @since 1.0
 * @param msg message caller
 * @param equipId id of the equip that user wants to buy
 */
export function buy(msg: Discord.Message, equipId: string): void {
  if (equipId === undefined) {
    msg.channel.send(
      "How do you expect to buy something without informn what to buy ?"
    );
    return;
  }

  if (reactionData.data === null) {
    msg.channel.send("I think that the shop is closed. Open it again");
    return;
  }

  if (Number(equipId) === NaN) {
    msg.channel.send("Well... I don't think that it is a equip id");
    return;
  }

  heroService
    .findbyUserID(msg.author.id)
    .then(hero => {
      if (hero === null) {
        msg.channel.send(
          "You can not buy an equip because you don't have a hero"
        );
        return;
      }

      const equipToBuy: Equipment = reactionData.data.find(
        equip => equip.id === equipId
      );

      if (equipToBuy.price > hero.gold) {
        msg.channel.send("NOT ENOUGH CASH!");
        return;
      }

      let equipType = "";
      if ("damage" in equipToBuy) {
        hero.weapon = equipToBuy;
        equipType = "weapon";
      } else if ("shield" in equipToBuy) {
        hero.shield = equipToBuy;
        equipType = "shield";
      }

      hero.gold -= equipToBuy.price;
      heroService
        .updateHero(hero)
        .then(() =>
          msg.channel.send(
            "Congratualitions! You now are equiping " +
              equipToBuy.name +
              " " +
              equipType
          )
        )
        .catch(error => {
          console.error(error);
          msg.channel.send(
            "I'm so sorry in say that, but we found a when delivering your equip"
          );
        });
    })
    .catch(error => {
      console.log(error);
    });
}
