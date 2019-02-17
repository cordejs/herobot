import * as Discord from "discord.js";
import { getHeroClass } from "../utils/classHandle";
import { Hero } from "../models/hero";
import { Emojis } from "../enums/emojis";
import heroService from "../services/heroRepository";

/**
 * Create a new user selecting a name and a class for him.
 * @since 0.1
 * @param msg Discord last message related to the command
 */
export function createHero(msg: Discord.Message) {
  // First check if the user already have an hero
  heroService
    .findbyUserID(msg.author.id)
    .then(hero => {
      if (hero !== null && hero !== undefined) {
        msg.channel.send(
          "You already have a hero created called `" + hero.name + "`"
        );
      } else {
        // If haven't, ask for hero's name
        msg.channel.send("What is your hero name ?").then(() => {
          // The user has 10 seconds to answer before creation procedure be canceled
          msg.channel
            .awaitMessages(
              responseName => responseName.author.id === msg.author.id,
              {
                max: 1,
                time: 10000,
                errors: ["time"]
              }
            )
            .then(getName => {
              const heroName = getName.first().content;

              if (heroName === undefined || heroName.trim() === "") {
                msg.channel.send(
                  "You can not create a hero without name " +
                    Emojis.SLIGHTLY_SAD +
                    " I know that you exists"
                );
              } else {
                msg.channel
                  .send("Hello " + heroName + ". What is your class ?")
                  .then(() => {
                    msg.channel
                      .awaitMessages(
                        classResponse =>
                          classResponse.author.id === msg.author.id,
                        {
                          max: 1,
                          time: 10000,
                          errors: ["time"]
                        }
                      )
                      .then(getClass => {
                        const className = getClass.first().content;

                        if (getHeroClass(className) !== undefined) {
                          heroService
                            .createhero(
                              new Hero(
                                heroName,
                                getHeroClass(className.toString()),
                                msg.author.id
                              )
                            )
                            .then(() =>
                              msg.channel.send("You're now a " + className)
                            )
                            .catch(error => {
                              console.log(
                                "Fail at hero creation. Error: " + error
                              );
                              msg.channel.send(
                                "Wasn't possible to create your hero"
                              );
                            });
                        } else {
                          msg.channel.send(
                            "You said your name, but not witch class you wanna be. We can not " +
                              "create a hero for you in that way"
                          );
                        }
                      });
                  });
              }
            })
            .catch(() =>
              msg.channel.send(
                "hero creation cancelled beause you are not speaking to me anymore" +
                  Emojis.SLIGHTLY_SAD
              )
            );
        });
      }
    })
    .catch(error => msg.channel.send(error));
}
