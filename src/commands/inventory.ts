import * as Discord from "discord.js";
import { EmbedMessage } from "../interfaces/embedMessage";
import { getHeroRepository } from "../utils/repositoryHandler";

/**
 * Shows all items that the hero has
 * @since 0.2
 * @param msg Discord last message related to the command
 */
export async function inventory(msg: Discord.Message) {
  try {
    const heroRepository = getHeroRepository();
    const hero = await heroRepository.findbyId(msg.author.id);

    if (hero !== null && hero !== undefined) {
      msg.channel.send("Create a hero before check his `status`");
      return;
    } else {
      const messages: EmbedMessage[] = [];
      const inventory = await hero.inventoryItens;

      inventory.forEach(inventoryItem => {
        inventoryItem.equip.then(equip => {
          const id = `Id: ${equip.id}`;
          const value = `Value: ${equip.price}`;
          const amount = `Amount: ${
            inventory.filter(async item => (await item.equip).id === equip.id)
              .length
          }`;

          messages.push({
            name: `${equip.name}`,
            value: `${id} | ${value} | ${amount}`
          });
        });
      });

      msg.channel.sendEmbed({ fields: messages });
    }
  } catch (error) {
    msg.channel.send(error);
    return;
  }
}
