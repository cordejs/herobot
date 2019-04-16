import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1555123953700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
        INSERT INTO potion(name,heal,price,sellprice,healdefinition) VALUES ('Small pottion',50,200,50,'amount');
        INSERT INTO potion(name,heal,price,sellprice,healdefinition) VALUES ('Red Potion',80,400,100,'amount');
        INSERT INTO potion(name,heal,price,sellprice,healdefinition) VALUES ('Orange Potion',120,620,155,'amount');
        INSERT INTO potion(name,heal,price,sellprice,healdefinition) VALUES ('White Potion',160,825,206,'amount');
        INSERT INTO potion(name,heal,price,sellprice,healdefinition) VALUES ('Medium Potion',200,1000,250,'amount');
        INSERT INTO potion(name,heal,price,sellprice,healdefinition) VALUES ('Big potion',300,1600,400,'amount');
        INSERT INTO potion(name,heal,price,sellprice,healdefinition) VALUES ('Elixir',100,5000,1250,'percentage');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
