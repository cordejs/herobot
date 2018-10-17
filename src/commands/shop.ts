import * as Discord from "discord.js"; 
import { playerService } from "../lib/services/playerService";  
import { getItemType } from "../lib/utils/itemTypeHandle"; 
import { BaseEntityService } from "../lib/services/baseEntityService";
/**
 * Informs all available items from selected type.
 * @param msg Discord last message related to the command
 */

export function shop(msg: Discord.Message) { 
  // First check if the user already have an player 
  msg.channel.send("Want to buy sword or shield ?").then(() => {
    msg.channel
    .awaitMessages(
      responseName => responseName.author.id === msg.author.id,
      {
        max: 1,
        time: 10000,
        errors: ["time"]
      }
    ).then(getItemType => {
        const itemTypeName = getItemType.first().content;
         var bdservice = new BaseEntityService();  
         readTextFile("../data/" + itemTypeName + ".json", function(text){
            var data = JSON.parse(text);
            msg.channel.send(data);
         }); 
    });
  }); 

  function readTextFile(file, callback) {
    var jsonFile = new XMLHttpRequest();
    jsonFile.overrideMimeType("application/json");
    jsonFile.open("GET", file, true);
    jsonFile.onreadystatechange = function() {
        if (jsonFile.readyState === 4 && jsonFile.status == 200) {
            callback(jsonFile.responseText);
        }
    }
    jsonFile.send(null);
   }
}