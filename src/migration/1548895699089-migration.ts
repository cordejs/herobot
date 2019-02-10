import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1548895699089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameColumn("monster", "shield", "defence");
    await queryRunner.renameColumn("play_status", "action", "task");

    await queryRunner.hasTable("inventory_item").then(exists => {
      if (exists) {
        queryRunner.query("DROP TABLE inventory_item CASCADE");
      }
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
