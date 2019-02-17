import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1550432009741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query("ALTER TABLE hero ALTER COLUMN id TYPE bigint");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
