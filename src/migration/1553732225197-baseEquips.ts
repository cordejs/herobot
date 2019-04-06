import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseEquips1553732225197 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
    insert into equip (name, level, damage, price, type)
        values('wood sword', 1, 1, 5, 'weapon');

    insert into equip (name, level, defence, price, type)
        values('wood shield', 1, 1, 5, 'shield');

    insert into equip (name, level, damage, price, type)
        values('Bronze Dagger', 1, 2, 10, 'weapon');

      insert into equip (name, level, damage, price, type)
          values('Enchanted Bronze Dagger', 1, 2, 10, 'weapon');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
