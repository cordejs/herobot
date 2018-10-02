"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const connections = require("./../connection");
const playerService_1 = require("./services/playerService");
const player_1 = require("./models/player");
/**
 * Bot commands:
 * @function create Creates a new User. Needs to informn the name and the class
 * @function profile TO DO -> Shows user's profile
 * @function delete TO DO -> Removes user's player
 *
 * @function reset TO DO -> Reset all user's informations
 * @function xp TO DO -> Shows user's actual experience
 * @function level TO DO -> Shows user's actual level
 *
 * @function gold TO DO -> shows user's actual gold
 * @function train TO DO -> Sends user's player to train a specific proficience(Damage or Defence)
 * Here the user will only get proficience level. No xp or gold
 * @function explore TO DO -> sned player to kill monsters. There he will receive xp, gold and equips
 *
 * @function shop TO DO -> see the equips for sell
 * @function buy TO DO -> buy an equip by his ID
 * @function boosters TO DO -> lists the boosters and his prices
 *
 * @function sell TO DO -> sell a player's equip
 */
const client = new Discord.Client();
const prefix = "_";
const playerService = new playerService_1.PlayerService();
client.on("ready", () => {
    console.log(`Ready for play! ${client.user.tag}!`);
});
client.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
    // Ignoring others bots
    if (msg.author.bot)
        return;
    // Checking if the command has the prefix
    if (!msg.content.startsWith(prefix, 0))
        return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === "create" || command === "c")
        createPlayer(msg);
}));
client.login(connections.SuperSecretDiscordToken.token);
/**
 * Create a new user selecting a name and a class for him.
 * @param msg
 */
function createPlayer(msg) {
    // First ask for player's name
    msg.channel.send("What is your player name ?").then(() => {
        // The user has 10 seconds to answer before creation procedure be canceled
        msg.channel.awaitMessages(responseName => responseName.author.id === msg.author.id, {
            max: 1,
            time: 10000,
            errors: ["time"]
        })
            .then(getName => {
            const playerName = getName.first().content;
            if (playerName === undefined || playerName.trim() === "") {
                msg.channel.send("You can not create a player without name :(. I know that you exists");
            }
            else {
                msg.channel.send("Hello " + playerName + ". What is your class ?")
                    .then(() => {
                    msg.channel.awaitMessages(classResponse => classResponse.author.id === msg.author.id, {
                        max: 1,
                        time: 10000,
                        errors: ["time"]
                    }).then(getClass => {
                        const className = getClass.first().content;
                        if (getHeroClass(className) !== undefined) {
                            msg.channel.send("You're now a " + className);
                            playerService.create(new player_1.Player(playerName, getHeroClass(className.toString())));
                        }
                    }).catch(() => msg.channel.send("You said your name, but not witch class you wanna be. We can not" +
                        "create a player for you in that way"));
                });
            }
        }).catch(() => msg.channel.send("Player creation cancelled beause you are not speaking to me :("));
    });
}
exports.createPlayer = createPlayer;
function getHeroClass(className) {
    if (className.trim().toUpperCase() === "Hunter" /* HUNTER */.toUpperCase())
        return "Hunter" /* HUNTER */;
    else if (className.trim().toUpperCase() === "Mage" /* MAGE */.toUpperCase())
        return "Mage" /* MAGE */;
    else if (className.trim().toUpperCase() === "Thief" /* THIEF */.toUpperCase())
        return "Thief" /* THIEF */;
    else if (className.trim().toUpperCase() === "Warrior" /* WARRIOR */.toUpperCase())
        return "Warrior" /* WARRIOR */;
    return undefined;
}
//# sourceMappingURL=bot.js.map