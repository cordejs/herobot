import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1550951959202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const has = await queryRunner.hasTable("equip");

    if (has) {
      await queryRunner.query("DROP TABLE IF EXISTS shield");
      await queryRunner.query(
        "CREATE TABLE shield (" +
          "defence integer not null" +
          ") INHERITS (equip)"
      );

      await queryRunner.query("DROP TABLE IF EXISTS weapon");
      await queryRunner.query(
        "CREATE TABLE weapon (" +
          "damage integer not null" +
          ") INHERITS (equip)"
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
