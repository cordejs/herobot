import * as Discord from "discord.js";
import { playerService } from "../lib/services/playerService";

/**
 * Inform the situation of the player in his exploration or trainning
 * @param msg Discord last message related to the command
 */
export function status(msg: Discord.Message) {
    playerService.findbyUserID(msg.author.id).then(player => {

        if (player === null) {
            msg.channel.send("Create a player before check his `status`");
            return;
        }

        if (player.adventureStartedTime !== null) {
            // time in seconds that the player is training
            const timeTrained = Math.floor(Date.now() / 1000) - Math.floor(player.adventureStartedTime / 1000);
            const monster = player.adventure.monster;
            const fullMonsterHp = player.adventure.monster.hp;

            let xpEarned = 0;
            let goldEarned = 0;
            let monstersKilled = 0;

            // Each value is a second, each second is a hit.
            for (let i = 0; i <= timeTrained; i++) {
                playerService.attackMonster(player, monster);

                if (monster.hp <= 0) {
                    xpEarned += monster.givedXp;
                    goldEarned += monster.givedGold;
                    monstersKilled++;
                    monster.hp = fullMonsterHp;
                }

                playerService.defendAttack(player, monster);

                if (player.hpActual <= 0) {
                    const time = new Date(Date.now() - player.adventureStartedTime);

                    player.deaths++;
                    player.monstersKilled += monstersKilled;
                    player.gold += goldEarned;

                    playerService.updatePlayer(player).then(() => {
                        msg.channel.send("You died after kill " + monstersKilled +
                        " monsters. You got " + goldEarned + " of gold and " + xpEarned +
                        " of experience. You explored for " +
                        time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
                    }).catch(error => {

                    });

                    break;
                }
            }
        }
    });
}