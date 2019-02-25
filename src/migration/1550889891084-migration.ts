import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1550889891084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE hero ALTER COLUMN idplaystatus SET NOT NULL"
    );
    await queryRunner.query(
      "ALTER TABLE proficience ALTER COLUMN xp SET DEFAULT 0"
    );
    await queryRunner.query(
      "ALTER TABLE proficience ALTER COLUMN level SET DEFAULT 1"
    );

    const has = await queryRunner.hasColumn("play_status", "gold");

    if (!has) {
      await queryRunner.query(
        "ALTER TABLE play_status ADD COLUMN gold integer NOT NULL DEFAULT 0"
      );
    }

    await queryRunner.query(
      "ALTER TABLE play_status ALTER COLUMN monsterskilled SET DEFAULT 0"
    );
    await queryRunner.query(
      "ALTER TABLE play_status ALTER COLUMN timestarted SET DEFAULT 0"
    );
    await queryRunner.query(
      "ALTER TABLE play_status ALTER COLUMN exp SET DEFAULT 0"
    );
    await queryRunner.query(
      "ALTER TABLE play_status ALTER COLUMN task DROP NOT NULL"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
