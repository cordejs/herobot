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
const connections = require("../connection");
const playerService_1 = require("./services/playerService");
const player_1 = require("./interfaces/player");
/**
 * Bot commands:
 * @function create Creates a new User. Needs to informn the name and the class
 * @function profile DOING(NEED TEST) -> Shows user's profile
 * @function delete DOING(NEED TEST) -> Removes user's player
 *
 * @function reset DOING(NEED TEST) -> Reset all user's informations
 * @function xp DOING(NEED TEST)-> Shows user's actual experience
 * @function gold DOING(NEED TEST) -> shows user's actual gold
 *
 * @function train TO DO -> Sends user's player to train a specific proficience(Damage or Defence)
 * Here the user will only get proficience level. No xp or gold
 * @function explore TO DO -> sned player to kill monsters. There he will receive xp, gold and equips
 * @function shop TO DO -> see the equips for sell
 *
 * @function buy TO DO -> buy an equip by his ID
 * @function boosters TO DO -> lists the boosters and his prices
 * @function sell TO DO -> sell a player's equip
 */
const client = new Discord.Client();
const prefix = "_";
const playerService = new playerService_1.PlayerService();
/**
 * Tell the world that we're ready!!
 */
client.on("ready", () => {
    console.log(`Ready for play! ${client.user.tag}!`);
});
/**
 * Correspond to the receptor of all messages sent by the users in Discord
 */
client.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
    // Ignoring others bots
    if (msg.author.bot)
        return;
    // Checking if the command has the prefix
    if (!msg.content.startsWith(prefix, 0))
        return;
    const args = msg.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === "create" || command === "c")
        createPlayer(msg);
    else if (command === "profile" || command === "p")
        profile(msg);
    else if (command === "delete" || command === "d")
        deletePlayer(msg);
    else if (command === "reset" || command === "r")
        reset(msg);
    else if (command === "xp")
        xp(msg);
    else if (command === "gold" || command === "g")
        gold(msg);
    else if (command === "farm" ||
        (command === "f" && (args.length > 1 && isNaN(+args[1]))))
        farm(msg, +args[1]);
}));
client.login(connections.SuperSecretDiscordToken.token);
/**
 * Create a new user selecting a name and a class for him.
 * @param msg Discord last message related to the command
 */
function createPlayer(msg) {
    // First check if the user already have an player
    playerService.findbyUserID(msg.author.id).then(player => {
        if (player !== undefined) {
            msg.channel.sendMessage("You already have a player created called " +
                player.name);
        }
        else {
            // If haven't, ask for player's name
            msg.channel.send("What is your player name ?").then(() => {
                // The user has 10 seconds to answer before creation procedure be canceled
                msg.channel
                    .awaitMessages(responseName => responseName.author.id === msg.author.id, {
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
                        msg.channel
                            .send("Hello " + playerName + ". What is your class ?")
                            .then(() => {
                            msg.channel
                                .awaitMessages(classResponse => classResponse.author.id === msg.author.id, {
                                max: 1,
                                time: 10000,
                                errors: ["time"]
                            })
                                .then(getClass => {
                                const className = getClass.first().content;
                                if (getHeroClass(className) !== undefined) {
                                    msg.channel.send("You're now a " + className);
                                    playerService.createPlayer(player_1.createObjectPlayer(playerName, getHeroClass(className.toString()), msg.author.id));
                                }
                            })
                                .catch(error => {
                                console.log("Fail at player creation. Error: " + error);
                                msg.channel.send("You said your name, but not witch class you wanna be. We can not " +
                                    "create a player for you in that way");
                            });
                        });
                    }
                })
                    .catch(() => msg.channel.send("Player creation cancelled beause you are not speaking to me :("));
            });
        }
    });
}
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
/**
 * Shows player's profile
 * @param msg Discord last message related to the command
 */
function profile(msg) {
    const userID = msg.author.id;
    playerService.findbyUserID(userID).then(player => {
        msg.channel.send(player);
    });
}
/**
 * Removes a user's player
 * @param msg Discord last message related to the command
 */
function deletePlayer(msg) {
    msg.channel
        .send("Are you sure that want to delete your amazing character ?")
        .then(() => {
        msg.channel
            .awaitMessages(answer => msg.author.id === answer.author.id, {
            max: 1,
            time: 10000,
            errors: ["time"]
        })
            .then(answer => {
            const ans = answer.first().content;
            if (ans.toLowerCase() === "yes" || ans.toLowerCase() === "y") {
                const userId = msg.author.id;
                playerService.removeByUserID(userId).then(() => {
                    msg.channel.send("Player was removed with sucess. When you be ready to start again, " +
                        +"tip " +
                        prefix +
                        "create to make a new character");
                });
            }
            else if (ans.toLowerCase() === "no" || ans.toLowerCase() === "n") {
                msg.channel.send("We're so happy that you don't give up :)");
            }
        });
    });
}
/**
 * Reboot all informations about the user. Making him have the attributes values equals to someone that
 * just started the game.
 * @see createObjectPlayer() at '*../interfaces/player*'
 * @param msg Discord last message related to the command
 */
function reset(msg) {
    msg.channel
        .send("Are you sure that want to reset all your progress ?")
        .then(() => {
        msg.channel
            .awaitMessages(answer => msg.author.id === answer.author.id, {
            max: 1,
            time: 10000,
            errors: ["time"]
        })
            .then(answer => {
            const ans = answer
                .first()
                .content.trim()
                .toLowerCase();
            if (ans.toLowerCase() === "yes" || ans.toLowerCase() === "y") {
                const userId = msg.author.id;
                playerService.findbyUserID(userId).then(player => {
                    if (player === undefined) {
                        msg.channel
                            .send("Hmmm. Locks like that you haven't a character created. Would you like to " +
                            +"create one now ?")
                            .then(() => {
                            msg.channel
                                .awaitMessages(answer => msg.author.id === answer.author.id, {
                                max: 1,
                                time: 10000,
                                errors: ["time"]
                            })
                                .then(ans => {
                                const response = ans
                                    .first()
                                    .content.trim()
                                    .toLowerCase();
                                if (response === "y" || response === "yes") {
                                    createPlayer(msg);
                                }
                            });
                        });
                        // Player exists
                    }
                    else {
                        const updatePlayer = player_1.createObjectPlayer(player.name, player.heroClass, player.id);
                        playerService.updatePlayer(updatePlayer).then(() => {
                            msg.channel.send("Player" + updatePlayer.name + "reseted");
                        });
                    }
                });
            }
            else if (ans === "no" || ans === "n") {
                msg.channel.send("Well done");
            }
        });
    });
}
/**
 * Inform player's experience
 * @param msg Discord last message related to the command
 */
function xp(msg) {
    playerService.findbyUserID(msg.author.id).then(player => {
        if (player !== undefined) {
            const percentage = (player.xp * 100) / player.levelMaxXp;
            msg.channel.send("You are current in level " +
                player.level +
                ". Your experience is" +
                player.xp +
                "/" +
                player.levelMaxXp +
                " (" +
                percentage +
                "%)");
        }
    });
}
/**
 * Shows player's total amount of gold
 * @param msg Discord last message related to the command
 */
function gold(msg) {
    playerService.findbyUserID(msg.author.id).then(player => {
        if (player !== undefined) {
            msg.channel.send("Your current gold is " + player.gold);
        }
    });
}
/**
 * Send user user to farm(Get gold, xp, and equips)
 * @param msg Discord last message related to the command
 * @param level difficult of the farm field. How bigger the number, harder is the field.
 * The amount of gold, xp received by the user increases according to the value of the level
 */
function farm(msg, level) {
    if (level > 0 && level <= 20) {
        playerService.findbyUserID(msg.author.id).then(player => {
            if (player !== undefined) {
                // TO DO
            }
        });
    }
}
//# sourceMappingURL=bot.js.map