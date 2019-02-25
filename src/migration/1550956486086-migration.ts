import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1550956486086 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let has = await queryRunner.hasColumn("equip", "level");

    if (!has) {
      await queryRunner.query(
        "ALTER TABLE equip ADD COLUMN level INTEGER NULL"
      );
      await queryRunner.query("UPDATE equip SET level = 1");
      await queryRunner.query(
        "ALTER TABLE equip ALTER COLUMN level SET NOT NULL"
      );
    }

    await queryRunner.query(
      "INSERT INTO shield(name, price, defence, level) VALUES('Cooper Shield', 3, 2, 1)"
    );
    await queryRunner.query(
      "INSERT INTO weapon(name, price, damage, level) VALUES('Cooper Sword', 3, 2, 1)"
    );

    has = await queryRunner.hasColumn("play_status", "idadventure");

    if (!has) {
      await queryRunner.query(
        "ALTER TABLE play_status ADD COLUMN idadventure SERIAL"
      );
      await queryRunner.query(
        "ALTER TABLE play_status ADD CONSTRAINT " +
          " fk_idadventure_playstatus FOREIGN KEY (idadventure) REFERENCES adventure(id)"
      );
      await queryRunner.query(
        "ALTER TABLE play_status " + "ALTER COLUMN idadventure DROP NOT NULL"
      );
      await queryRunner.query(
        "ALTER TABLE play_status " + "ALTER COLUMN idadventure SET DEFAULT null"
      );
    }

    await queryRunner.query(
      "ALTER TABLE inventory_item ALTER COLUMN idhero TYPE BIGINT"
    );
  }
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
