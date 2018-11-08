import * as Discord from "discord.js";
import { heroService } from "../services/heroService";

/**
 * Shows hero's profile
 * @since 1.0
 * @param msg Discord last message related to the command
 */
export function profile(msg: Discord.Message) {
  heroService.findbyUserID(msg.author.id).then(hero => {
    msg.channel.send(
      "Name: `" +
        hero.name +
        "`\n" +
        "Gold: **$" +
        hero.gold +
        "**\n" +
        "Class: `" +
        hero.heroClass +
        "`\n" +
        "Hp: " +
        hero.hpActual +
        " / " +
        hero.hpTotal +
        "\n" +
        "Level: **" +
        hero.level +
        "** (" +
        hero.xp +
        " / " +
        hero.levelMaxXp +
        " )\n" +
        "Damage proficience level: **" +
        hero.damageProficience.level +
        "** (" +
        hero.damageProficience.xp +
        " / " +
        hero.damageProficience.levelMaxXp +
        ")\n" +
        "Shield proficience level: **" +
        hero.shieldProficience.level +
        "** (" +
        hero.shieldProficience.xp +
        " / " +
        hero.shieldProficience.levelMaxXp +
        ")\n" +
        "Weapon: `" +
        hero.weapon.name +
        "`\n" +
        "Shield: `" +
        hero.shield.name +
        "`\n" +
        "Damage: **" +
        heroService.calcDamage(
          hero.weapon.damage,
          hero.damageProficience.level
        ) +
        "**\n" +
        "Defence: **" +
        heroService.calcDefence(
          hero.shield.defence,
          hero.shieldProficience.level
        ) +
        "**"
    );
  });
}
