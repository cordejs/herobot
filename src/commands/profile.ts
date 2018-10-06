import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";

/**
 * Shows player's profile
 * @param msg Discord last message related to the command
 */
export function profile(msg: Discord.Message) {
    playerService.findbyUserID(msg.author.id).then(player => {
        msg.channel.send(
            "Name: " + player.name + "\n" +
            "Gold: $" + player.gold + "\n" +
            "Class: " + player.heroClass + "\n" +
            "Hp: " + player.hpActual + " / " + player.hpTotal + "\n" +
            "Level: " + player.level + "\n" +
            "Experience: " + player.xp + " / " + player.levelMaxXp + "\n" +
            "Damage proficience level: " + player.damageProficience.level + "\n" +
            "Damage proficience xp: " + player.damageProficience.xp + " / " + player.damageProficience.levelMaxXp
            + "\n" +
            "Shield proficience level: " + player.shieldProficience.level + "\n" +
            "Shield proficience xp: " + player.shieldProficience.xp + " / " + player.shieldProficience.levelMaxXp
        );
    });
}