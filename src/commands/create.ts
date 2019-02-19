import * as Discord from "discord.js";
import { getHeroClass } from "../utils/classHandle";
import { Emojis } from "../enums/emojis";
import { getHeroRepository } from "../utils/repositoryHandler";
import { HeroRepository } from "../repositories/heroRepository";
import { Hero } from "../entity/hero";
import { getHeroClassepository } from "../repositories/heroClassRepository";

/**
 * Create a new user selecting a name and a class for him.
 * @since 0.1
 * @param msg Discord last message related to the command
 */
export async function createHero(msg: Discord.Message) {
  let heroRepository: HeroRepository;

  try {
    heroRepository = getHeroRepository();
  } catch (error) {
    msg.channel.send(error);
    return;
  }

  // First check if the user already have an hero
  const hero = await heroRepository.findbyId(msg.author.id);

  if (hero) {
    msg.channel.send(
      "You already have a hero created called `" + hero.name + "`"
    );
  } else {
    // If haven't, ask for hero's name
    await msg.channel.send("What is your hero name ?");

    // The user has 10 seconds to answer before creation procedure be canceled
    const getName = await msg.channel.awaitMessages(
      responseName => responseName.author.id === msg.author.id,
      {
        max: 1,
        time: 10000,
        errors: ["time"]
      }
    );

    const heroName = getName.first().content;

    if (heroName === undefined || heroName.trim() === "") {
      msg.channel.send(
        "You can not create a hero without name " +
          Emojis.SLIGHTLY_SAD +
          " I know that you exists"
      );
    } else {
      await msg.channel.send("Hello " + heroName + ". What is your class ?");

      const getClass = await msg.channel.awaitMessages(
        classResponse => classResponse.author.id === msg.author.id,
        {
          max: 1,
          time: 10000,
          errors: ["time"]
        }
      );

      const className = getClass.first().content;

      if (getHeroClass(className) !== undefined) {
        const classHero = getHeroClass(className.toString());
        const heroClassRepository = getHeroClassepository();

        try {
          const _class = await heroClassRepository.findByName(classHero);

          try {
            await heroRepository.createhero(
              new Hero(heroName, _class, Number.parseInt(msg.author.id))
            );

            msg.channel.send("You're now a " + className);
          } catch (error) {
            console.log("Fail at hero creation. Error: " + error);
            msg.channel.send("Wasn't possible to create your hero");
          }
        } catch (error) {
          msg.channel.send(error);
        }
      } else {
        msg.channel.send(
          "You said your name, but not witch class you wanna be. We can not " +
            "create a hero for you in that way"
        );
      }
    }
  }
}
