import { MigrationInterface, QueryRunner } from "typeorm";
import { ClassName, ClassNameEvolve } from "../enums/className";

export class Migration1550502138205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff)` +
        `SELECT '${ClassName.BEGGINNER}', 0, 0, 0, 0, 0, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${
          ClassName.BEGGINNER
        }')`
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff)` +
        `SELECT '${ClassName.WARRIOR}', 0, 0, 0, 0, 5, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${
          ClassName.WARRIOR
        }')`
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        `SELECT '${ClassName.MAGE.toString()}', 0, 0, 3, 0, 0, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassName.MAGE.toString()}')`
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff)` +
        ` SELECT '${ClassName.THIEF.toString()}', 0, 0, 0, 1, 0, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassName.THIEF.toString()}')`
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        `SELECT '${ClassName.ARCHER.toString()}', 0, 0, 0, 0, 5, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassName.ARCHER.toString()}')`
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff)` +
        `SELECT '${ClassNameEvolve.KNIGHT.toString()}', 0, 0, 0, 1, 10, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.KNIGHT.toString()}')`
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        `SELECT '${ClassNameEvolve.PALADIN.toString()}', 0, 5, 0, 1, 5, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.PALADIN.toString()}')`
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        ` SELECT '${ClassNameEvolve.NECRO.toString()}', 0, 0, 0, 0, 5, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.NECRO.toString()}')`
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        `SELECT '${ClassNameEvolve.LADIN.toString()}', 0, 0, 0, 1, 5, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.LADIN.toString()}')`
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        `SELECT '${ClassNameEvolve.NINJA.toString()}', 0, 5, 0, 1, 0, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.NINJA.toString()}')`
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        ` SELECT '${ClassNameEvolve.HUNTER.toString()}', 1, 10, 0, 1, 0, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.HUNTER.toString()}')`
    );

    await queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) ` +
        `SELECT '${ClassNameEvolve.TRICKSTER.toString()}', 1, 5, 0, 1, 5, 0` +
        `WHERE NOT EXISTS(SELECT name FROM heroclass WHERE name='${ClassNameEvolve.TRICKSTER.toString()}')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
