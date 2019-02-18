import { MigrationInterface, QueryRunner } from "typeorm";
import { ClassName } from "../enums/className";

export class Migration1550502138205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) SELECT ${
        ClassName.WARRIOR
      }, 0, 0, 0, 0, 5, 0`
    );
    queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) SELECT ${
        ClassName.MAGE
      }, 0, 0, 3, 0, 0, 0`
    );
    queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) SELECT ${
        ClassName.THIEF
      }, 0, 0, 0, 1, 0, 0`
    );
    queryRunner.query(
      `INSERT INTO heroclass (name, attackspeedbuff, damagebuff, expbuff, goldbuff, hpbuff, shieldbuff) SELECT ${
        ClassName.ARCHER
      }, 0, 0, 0, 0, 5, 0`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
