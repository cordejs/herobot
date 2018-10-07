import * as Discord from "discord.js";
import { ProficienceType } from "../lib/enums/proficienceType";
import { playerService } from "../lib/services/playerService";

/**
 * Sends player to train a Proficience(Damage or Defence)
 * @param msg User's message on discord
 */
export function train(msg: Discord.Message, proficience: string) {
    if (proficience === ProficienceType.DAMAGE || proficience === ProficienceType.SHIELD) {
        playerService.findbyUserID(msg.author.id).then(player => {
            if (player === null) {
                msg.channel.send("Your can not send your character to train being that you haven't one");
            } else {

                if (proficience === ProficienceType.DAMAGE) player.trainShieldStartedTime = Math.floor(Date.now() / 1000);
                else player.trainShieldStartedTime = Math.floor(Date.now() / 1000);

                playerService.updatePlayer(player)
                .then(() => msg.channel.send("Player successfully sent to train"))
                .catch(error => {
                    console.log("train method error: " + error);
                    msg.channel.send("Hmmm. looks like that we have some technical problems. "
                    + "Your character won't sent to train");
                });

            }
        });
    } else {
        msg.channel.send("Please, you must choose train your `damage` or your `shield`");
    }
}
