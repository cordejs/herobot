import * as Discord from "discord.js";
import heroService from "../services/heroService";
import { InventoryItem } from "../interfaces/inventoryItem";

/**
 * Inform the situation of the hero in his exploration or trainning
 * @since 0.2
 * @param msg Discord last message related to the command
 */
export function sell(msg: Discord.Message, itemID: string) {
    heroService.findbyUserID(msg.author.id).then(hero => {
        if (hero === null) {
            msg.channel.send("Create a hero before check his `status`");
            return;
        }
        else if (itemID !== "" && itemID !== null && itemID !== undefined) {
            let itemToSell: InventoryItem = hero.inventory.find(itemInventory => itemInventory.item.id == itemID);
            if (itemToSell !== undefined) {
                msg.channel.send("Are you sure that want to sell " + itemToSell.item.name + " for $" + itemToSell.item.price + " ?")
                    .then(() => {
                        msg.channel.awaitMessages(responseName => responseName.author.id === msg.author.id,
                            {
                                max: 1,
                                time: 10000,
                                errors: ["time"]
                            }
                        ).then(response => {
                            const ans = response.first().content.toLocaleLowerCase().trim();

                            if (ans === "yes" || ans === "y") {

                                if (hero.inventory.length === 0 || hero.inventory === undefined) {
                                    hero.inventory = [];
                                    hero.inventory.push({ item: hero.weapon, amount: 1, equiped: true });
                                    hero.inventory.push({ item: hero.shield, amount: 1, equiped: true });
                                }

                                hero.inventory.push({ item: hero.weapon, amount: 1, equiped: true });
                                hero.inventory.push({ item: hero.weapon, amount: 1, equiped: true });

                                hero.gold += itemToSell.item.price;
                                const index = hero.inventory.indexOf(itemToSell, 0);

                                if (index > -1) {
                                    hero.inventory.splice(index, 1);
                                }
                                heroService.updateHero(hero)
                                    .then(() => msg.channel.send("Item sold! Your current gold is $" + hero.gold))
                                    .catch(error => {
                                        console.log(error);
                                        msg.channel.send(error);
                                    });

                            } else {
                                msg.channel.send("Hmm. Ok then");
                            }
                        }).catch(error => {
                            console.log("User dot not respond sell command. Output: " + error);
                        });
                    });
            }
        } else {
            msg.channel.send("You do not choose a item to sell");
        }
    }).catch(error => msg.channel.send(error));
}
