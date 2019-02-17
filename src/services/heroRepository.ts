import { Monster } from "../interfaces/monster";
import { getTimeStampFormated } from "../utils/time";
import { ProficienceType } from "../enums/proficienceType";
import { Action, Task } from "../enums/action";
import { HeroDieError } from "../errors/heroDieError";
import { randomNumber } from "../utils/random";
import { JsonHandle } from "../utils/jsonHandle";
import { Hero } from "../entity/hero";
import { Proficience } from "../entity/proficience";
import { PlayStatus } from "../entity/playStatus";
import { IPlayStatus } from "../interfaces/playStatus";
import { EntityRepository, Repository } from "typeorm";

/** @internal */
@EntityRepository(Hero)
export class HeroRepository extends Repository<Hero> {
  createhero(hero: Hero): Promise<Hero> {
    return super.save(hero);
  }

  async findbyId(id: string): Promise<Hero> {
    return super.findOne(Number.parseInt(id));
  }

  updateHero(hero: Hero): Promise<Hero> {
    return super.save(hero);
  }

  /**
   * Calculate the total amount of damage that will be gived based in the damage value and bonus.
   * @param damage weapon
   * @param bonus proficience
   */
  calcDamage(damage: number, bonus?: number): number {
    if (damage !== undefined) {
      if (bonus === undefined) bonus = 0;
      return Math.floor(damage * 1.8 + bonus);
    }
    return 0;
  }

  /**
   * Return the total amount of defence
   */
  async heroDefence(hero: Hero): Promise<number> {
    if (hero !== undefined) {
      const defenceProficience = await hero.defenceProficience;
      const shield = await hero.shield;

      return this.calcDefence(shield.defence, defenceProficience.level);
    }
  }

  /**
   * Calculate the percentage of damage that will be reduced from an atack.
   * Defence is based in percentage
   * @param defence armo
   * @param bonus proficience
   */
  calcDefence(defence: number, bonus?: number): number {
    if (defence !== undefined) {
      if (bonus === undefined) bonus = 1;
      return Math.floor(defence * 1.2 + bonus);
    }
    return 0;
  }

  /**
   * Calculate the amount of hp will be taken from an atack based in a defence
   * @param damage value(calculated) of damage that the atacker will give
   * @param defence value(%) that will be reduced from the atack
   */
  calcDamageTaken(damage: number, defence: number): number {
    if (damage !== undefined && defence !== undefined) {
      return damage - defence >= 0 ? damage - defence : 0;
    }
  }

  /**
   * Reduces monster's life based in hero attack value
   * @param hero who will atack the monster
   * @param monster the monster that will be attacked
   */
  async attackMonster(hero: Hero, monster: Monster): Promise<void> {
    if (hero !== undefined && monster !== undefined) {
      const weapon = await hero.weapon;
      const damageProficience = await hero.damageProficiente;

      monster.hp =
        monster.hp -
        this.calcDamageTaken(
          this.calcDamage(weapon.damage, damageProficience.level),
          this.calcDefence(monster.shield)
        );
    }
  }

  /**
   * Reduces hero's life based in a monster attack value
   * @param hero who will defend monster attack
   * @param monster monster who will atack hero
   */
  async defendAttack(hero: Hero, monster: Monster): Promise<void> {
    if (hero !== undefined && monster !== undefined) {
      const shield = await hero.shield;
      const defenceProficience = await hero.defenceProficience;

      hero.hpActual =
        hero.hpActual -
        this.calcDamageTaken(
          this.calcDamage(monster.damage),
          this.calcDefence(shield.defence, defenceProficience.level)
        );
    }
  }

  /**
   * Calcs the amount of experience in Shield or Damage proficience the hero will get
   * @description It gets the actual timestamp and subtract from the time that the hero
   * started train.(The time is got in minutes and each minute is equal a random number between 5 an 20).
   * It also adjusts the level of proficiency if it increases
   * @example 1min = 5~20 exp points
   * @param hero Who will have the proficience points calculated
   */
  async upgradeProficience(hero: Hero) {
    if (hero === undefined) return;

    let proficience: Proficience;
    const heroStatus = await hero.playStatus;

    if (heroStatus.task === Task.DAMAGE_TRAINING) {
      proficience = await hero.damageProficiente;
    } else if (heroStatus.task === Task.SHIELD_TRAINING) {
      proficience = await hero.defenceProficience;
    } else {
      return;
    }

    const timeTrained = getTimeStampFormated() - heroStatus.timestarted;
    heroStatus.exp = this.generateExpTotal(timeTrained);

    heroStatus.save();
    return getTimeStampFormated() - heroStatus.timestarted;
  }

  /**
   * Calcs the amount of exp the hero will receive in the given time and
   * convert it to minutes.
   * @param time Time to calculate the exp. The value must be in TimeStamp
   * without milliseconds
   */
  generateExpTotal(time: number): number {
    time = Math.floor((time / 60) % 60);
    let total: number = 0;
    for (let i = 0; i < time; i++) {
      total += randomNumber(5, 20);
    }
    return total;
  }

  /**
   * Updated playstatus.time with the actual timestamp and calcs user training bounties
   * @throws heroDieError if the hero died in exploration
   */
  updateHeroTraining(hero: Hero): Promise<IPlayStatus> {
    return this.calcHeroTrainingBase(hero, false);
  }

  /**
   * Set the adventureStarted time with undefined and calcs user training bounties
   * @throws heroDieError if the hero died in exploration
   */
  async finishHeroTraining(hero: Hero): Promise<IPlayStatus> {
    return this.calcHeroTrainingBase(hero, true);
  }

  /**
   * Calcs what the hero got in exploration.
   * @param hero Who will have him bounts calculated
   * @param finishTraning Defines if the training must end (then the value that store when the
   * hero started training is set to 'undefined') or updated (then the value that store when
   * the hero started training is set to the value in 'getTimeStampFormated()' method
   * @return Result of hero exploration
   * @throws heroDieError of type PlayStatus meaning that the hero died in exploration
   */
  private async calcHeroTrainingBase(
    hero: Hero,
    finishTraning: boolean
  ): Promise<IPlayStatus> {
    const playstatus = await hero.playStatus;
    const adventure = await playstatus.adventure;
    const monster = await adventure.monster;
    const weapon = await hero.weapon;

    const time = getTimeStampFormated() - playstatus.timestarted;

    // hit/20secs
    // Each value is a hit
    const hitConst = 20;
    const hits = Math.floor(time / hitConst);

    const damageToMonster = this.calcDamageTaken(
      this.calcDamage(weapon.damage, (await hero.damageProficiente).level),
      this.calcDefence(monster.defence)
    );

    const damageToHero = this.calcDamageTaken(
      this.calcDamage(monster.damage),
      this.calcDefence(
        (await hero.shield).defence,
        (await hero.defenceProficience).level
      )
    );

    const heroLifeLost = damageToHero * hits;
    let monstersKilled = Math.floor((damageToMonster * hits) / monster.hp);

    const hitsToKillHero = Math.floor(hero.hpTotal / damageToHero);

    let goldEarned: number;
    let expEarned: number;

    // Hero is alive
    if (heroLifeLost < hero.hpTotal) {
      hero.hpActual = hero.hpTotal - heroLifeLost;

      expEarned = monster.givedxp * monstersKilled;
      goldEarned = monster.givedgold * monstersKilled;

      playstatus.gold = goldEarned;
      playstatus.exp = expEarned;
      playstatus.timestarted = time;
      playstatus.monsterskilled = monstersKilled;
    } // Hero is dead
    else {
      monstersKilled = Math.floor(
        (damageToMonster * hitsToKillHero) / monster.hp
      );
      expEarned = monster.givedxp * monstersKilled;
      goldEarned = monster.givedgold * monstersKilled;

      hero.gold += goldEarned;
      hero.monstersKilled += monstersKilled;
      hero.updateExp(expEarned);

      hero.hpActual = hero.hpTotal;

      const dieError: IPlayStatus = {
        exp: playstatus.exp + expEarned,
        gold: playstatus.gold + goldEarned,
        monsterskilled: playstatus.monsterskilled + monstersKilled,
        timestarted: time - hitsToKillHero * hitConst,
        task: playstatus.task
      };

      hero.playStatus = null;
      this.updateHero(hero);

      throw new HeroDieError(dieError);
    }
    return {
      exp: playstatus.exp,
      gold: playstatus.gold,
      monsterskilled: playstatus.monsterskilled,
      timestarted: playstatus.timestarted,
      task: playstatus.task
    };
  }
}
