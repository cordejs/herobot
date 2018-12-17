import * as Discord from "discord.js";
import heroService from "../services/heroService";
import { JsonHandle } from "../utils/JsonHandle";
import { reactionData } from "../utils/global";
import { Item } from "../interfaces/item";
import { Emojis } from "../enums/emojis";

/**
 * Informs all available items from selected type.
 * @since 1.0
 * @param msg Discord last message related to the command
 * @param shopType Specify the type of shop (weapon/shield)
 */
export function shop(msg: Discord.Message, shopType: string) {
  heroService.findbyUserID(msg.author.id).then(hero => {
    if (hero === null) {
      msg.channel.send("Create a hero before check the shop ");
      return;
    }

    if (
      shopType !== undefined &&
      shopType.toLocaleLowerCase().trim() === "shield"
    ) {
      shieldShop(msg);
    } else if (
      shopType !== undefined &&
      shopType.toLocaleLowerCase().trim() === "weapon"
    ) {
      weaponShop(msg);
    } else {
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
              shieldShop(msg);
            } else if (type === "sword") {
              weaponShop(msg);
            }
          });
      });
    }
  }).catch((error) => msg.channel.send(error));
}

async function addReactions(botMessage: Discord.Message) {
  await botMessage.react(Emojis.FIRST);
  await botMessage.react(Emojis.BACK);
  await botMessage.react(Emojis.NEXT);
  await botMessage.react(Emojis.LAST);
}

function addRectionData(
  equips: Item[],
  botMessage: Discord.Message,
  userMessage: Discord.Message
) {
  reactionData.data = equips;
  reactionData.index = 0;
  reactionData.userId = userMessage.author.id;
  reactionData.message = botMessage;
}

/**
 * Informs all available items from selected type.
 * @param msg Discord last message related to the command
 */
function shieldShop(msg: Discord.Message) {
  const shields = JsonHandle.getAllShieldS();
  const items: Array<string> = new Array<string>();

  shields.forEach(shield =>
    items.push(
      `Id: ${shield.id}\n` +
      `Name: ${shield.name}\n` +
      `Defence: ${shield.defence}\n` +
      `Price: ${shield.price}\n\n`
    )
  );

  msg.channel.send(items[0]).then(async (message: Discord.Message) => {
    addReactions(message);
    addRectionData(shields, message, msg);
  });
}

/**
 * Informs all available weapons for seal
 * @param msg Discord last message related to the command
 */
function weaponShop(msg: Discord.Message) {
  const weapons = JsonHandle.getAllWeapons();
  const items: Array<string> = new Array<string>();

  weapons.forEach(weapons =>
    items.push(
      `Id: ${weapons.id}\n` +
      `Name: ${weapons.name}\n` +
      `Damage: ${weapons.damage}\n` +
      `Price: ${weapons.price}\n\n`
    )
  );

  msg.channel.send(items[0]).then(async (message: Discord.Message) => {
    addReactions(message);
    addRectionData(weapons, message, msg);
  });
}
