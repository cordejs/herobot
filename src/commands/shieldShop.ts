import * as Discord from "discord.js";
import { JsonHandle } from "../utils/JsonHandle";
import { heroService } from "../services/heroService";
import { Hero } from "../models/hero";

/**
 * Informs all available items from selected type.
 * @param msg Discord last message related to the command
 */
export function shieldShop(msg: Discord.Message, hero?: Hero) {
  if (hero) {
    shieldShopBase(msg, hero);
  } else {
    heroService.findbyUserID(msg.author.id).then(hero => {
      if (hero) {
        shieldShopBase(msg, hero);
      }
    });
  }
}

function shieldShopBase(msg: Discord.Message, hero: Hero) {
  const shields = JsonHandle.getAllShieldS();
  const items: Array<string> = new Array<string>();
  let index: number = 0;

  shields.forEach(shield =>
    items.push(
      `Id: ${shield.id}\n` +
        `Name: ${shield.name}\n` +
        `Defence: ${shield.defence}\n` +
        `Price: ${shield.price}\n\n`
    )
  );

  msg.channel.send(items[index]).then(async (message: Discord.Message) => {
    const filter = (reaction, user) => {
      return reaction.emoji.name === "▶";
    };

    await message.react("⏪");
    await message.react("◀");
    await message.react("▶");
    await message.react("⏩");

    message.awaitReactions(filter, { max: 100, time: 5000 }).then(reaction => {
      switch (reaction.first().emoji.name) {
        case "▶": {
          if (index + 1 !== items.length) {
            index++;
            message.edit(items[index]);
          }
          break;
        }
        case "◀": {
          if (index - 1 !== 0) {
            index--;
            message.edit(items[index]);
          }
          break;
        }
        case "◀": {
          if (index - 1 !== 0) {
            index--;
            message.edit(items[index]);
          }
          break;
        }
        case "⏪": {
          message.edit(items[0]);
          break;
        }
        case "⏩": {
          message.edit(items[items.length - 1]);
          break;
        }
      }
    });

    msg.channel
      .awaitMessages(responseName => responseName.author.id === msg.author.id, {
        max: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(response => {
        const id = response.first().content;
        const shield = JsonHandle.getShieldById(+id);
        if (shield !== undefined) {
          if (hero.gold - shield.price >= 0) {
            const defenceDifference = shield.defence - hero.shield.defence;
            hero.gold -= shield.price;
            hero.shield = shield;

            if (defenceDifference > 0) {
              heroService
                .updateHero(hero)
                .then(() =>
                  msg.channel.send(
                    "You sucessfully bought`" +
                      shield.name +
                      "`. Your defence now is " +
                      shield.defence +
                      " (+" +
                      defenceDifference +
                      ")"
                  )
                )
                .catch(erro => {
                  console.error(erro);
                  msg.channel.send(
                    "We found a problem when we're delivering the shield to you"
                  );
                });
            } else {
              heroService
                .updateHero(hero)
                .then(() =>
                  msg.channel.send(
                    "You sucessfully bought`" +
                      shield.name +
                      "`. Your defence now is " +
                      shield.defence +
                      " (" +
                      defenceDifference +
                      ")"
                  )
                )
                .catch(erro => {
                  console.error(erro);
                  msg.channel.send(
                    "We found a problem when we're delivering the shield to you"
                  );
                });
            }
          } else {
            msg.channel.send(
              "So you want to buy a shield without enought money ?. It's not cool"
            );
          }
        } else {
          msg.channel.send("There is no shield with this id");
        }
      })
      .catch(() => {
        console.log("User do not answered");
      });
  });
}
