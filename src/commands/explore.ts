import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";
import { Adventure } from "../lib/interfaces/adventure";

import * as adventures from "../../data/adventures.json";

export const explorationMaxLevel = 20;

/**
 * Send user user to farm(Get gold, xp, and equips)
 * @param msg Discord last message related to the command
 * @param level difficult of the farm field. How bigger the number, harder is the field.
 * The amount of gold, xp received by the user increases according to the value of the level
 */
export function explore(msg: Discord.Message, level: number) {
    if (level > 0 && level <= explorationMaxLevel) {
        playerService.findbyUserID(msg.author.id).then(player => {
            if (player !== null) {

                const adv: Adventure = adventures[level];

                if (adv === undefined) {
                    msg.channel.send("Hmmm, the informed adventure does not exist ");
                    return;
                }

                const time = Math.floor(Date.now() / 1000);

                player.adventure = adv;
                player.adventureStartedTime = time;

                playerService.updatePlayer(player).then(() => {
                    msg.channel.send("Player is exploring " + adv.name) + ". Good Farmning!";
                });

            }
        });
    } else {
        msg.channel.send("You must choose a number between 1 and " + explorationMaxLevel + " to send your ");
    }
}