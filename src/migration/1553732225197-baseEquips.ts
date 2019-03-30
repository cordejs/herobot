import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseEquips1553732225197 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        WITH rows AS (
            INSERT INTO equip
                (name, price, level)
            VALUES
                ('Wood Sword', 10, 1)
            RETURNING id, 10 as damage
        )
        INSERT INTO weapon SELECT id, damage FROM rows;
        `);

    await queryRunner.query(`
        WITH rows AS (
            INSERT INTO equip
                (name, price, level)
            VALUES
                ('Wood Shield', 10, 1)
            RETURNING id, 10 as damage
        )
        INSERT INTO shield SELECT id, damage FROM rows;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
