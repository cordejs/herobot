import * as Discord from "discord.js";
import heroService from "../services/heroService";
import { EmbedMessage } from "../interfaces/embedMessage";

/**
 * Shows all items that the hero has
 * @since 0.2
 * @param msg Discord last message related to the command
 */
export function inventory(msg: Discord.Message) {
    heroService.findbyUserID(msg.author.id).then(hero => {
        if (hero !== null && hero !== undefined) {
            msg.channel.send("Create a hero before check his `status`");
            return;
        }
        else {

            if (hero.inventory.length === 0 || hero.inventory === undefined) {
                hero.inventory = [];
                hero.inventory.push({ item: hero.weapon, amount: 1, equiped: true });
                hero.inventory.push({ item: hero.shield, amount: 1, equiped: true });
            }

            const messages: EmbedMessage[] = [];

            hero.inventory.forEach(inventoryItem => {
                messages.push({
                    name: `${inventoryItem.item.name} ${inventoryItem.equiped ? "(Equipped)" : ""}`,
                    value: `Id: ${inventoryItem.item.id} | Value: $${inventoryItem.item.price} | Amount: ${inventoryItem.amount}`
                });
            });

            msg.channel.sendEmbed({ fields: messages });
        }
    });
}
