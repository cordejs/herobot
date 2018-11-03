import * as Discord from "discord.js";
import { JsonHandle } from "../utils/JsonHandle";
import { Player } from "../models/player";
import { playerService } from "../services/playerService";

/**
 * Informs all available items from selected type.
 * @param msg Discord last message related to the command
 */
export function shieldShop(msg: Discord.Message, player: Player) {
  const shields = JsonHandle.getAllShieldS();
  let defineMsg: string = "ID    Name    Defence    Price";
  shields.forEach(
    shield =>
      (defineMsg += `${shield.id}    ${shield.name}    ${shield.defence}    ${
        shield.price
      } \n`)
  );
  msg.channel.send(defineMsg).then(() => {
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
          if (player.gold - shield.price >= 0) {
            const damageDifference = shield.defence - player.shield.defence;
            player.gold -= shield.price;
            player.shield = shield;

            if (damageDifference > 0) {
              playerService
                .updatePlayer(player)
                .then(() =>
                  msg.channel.send(
                    `You sucessfully bought ${shield.name}. ` +
                      `Your defence now is ${
                        shield.defence
                      }(+ ${damageDifference})`
                  )
                )
                .catch(erro => {
                  console.error(erro);
                  msg.channel.send(
                    "We found a problem when we're delivering the shield to you"
                  );
                });
            } else {
              playerService
                .updatePlayer(player)
                .then(() =>
                  msg.channel.send(
                    `You sucessfully bought ${shield.name}. ` +
                      `Your damage now is ${shield.defence}(${damageDifference})`
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
      });
  });
}
