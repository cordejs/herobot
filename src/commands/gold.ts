import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";
/**
 * Shows player's total amount of gold
 * @param msg Discord last message related to the command
 */
export function gold(msg: Discord.Message) {
    playerService.findbyUserID(msg.author.id).then(player => {
        if (player !== null) {
            msg.channel.send("Your current gold is $" + player.gold);
        }
    });
}