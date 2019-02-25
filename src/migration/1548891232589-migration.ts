import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1548891232589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "DROP TABLE IF EXISTS adventure CASCADE; " +
        "DROP TABLE IF EXISTS monster CASCADE;" +
        "DROP TABLE IF EXISTS playstatus CASCADE;" +
        "DROP TABLE IF EXISTS inventory_item CASCADE;" +
        "DROP TABLE IF EXISTS hero CASCADE;" +
        "DROP TABLE IF EXISTS weapon CASCADE;" +
        "DROP TABLE IF EXISTS shield CASCADE;" +
        "DROP TABLE IF EXISTS item CASCADE;" +
        "DROP TABLE IF EXISTS proficience CASCADE;" +
        "DROP TABLE IF EXISTS play_status CASCADE;" +
        "CREATE TABLE proficience (" +
        "   id INTEGER PRIMARY KEY," +
        "    level INTEGER NOT NULL," +
        "    xp INTEGER NOT NULL," +
        "    levelMaxXp INTEGER NOT NULL" +
        ");" +
        "CREATE TABLE monster (" +
        "    id INTEGER PRIMARY KEY," +
        "    name CHARACTER(30) NOT NULL," +
        "    level INTEGER NOT NULL," +
        "    damage INTEGER NOT NULL," +
        "    hp INTEGER NOT NULL," +
        "    defence INTEGER NOT NULL," +
        "    givedxp INTEGER NOT NULL," +
        "    givedgold INTEGER NOT NULL" +
        ");" +
        "CREATE TABLE item (" +
        "    id INTEGER PRIMARY KEY," +
        "    name CHARACTER(50) NOT NULL," +
        "    price INTEGER NOT NULL" +
        ");" +
        "CREATE TABLE shield (" +
        "    defence INTEGER NOT NULL," +
        ") INHERITS (equip);" +
        "CREATE TABLE weapon (" +
        "    damage INTEGER NOT NULL," +
        ") INHERITS (equip);" +
        "CREATE TABLE adventure (" +
        "    id INTEGER PRIMARY KEY," +
        "    level INTEGER NOT NULL," +
        "    name CHARACTER(40) NOT NULL," +
        "    monsterid INTEGER NULL REFERENCES monster(id)," +
        ");" +
        "CREATE TABLE play_status (" +
        "    id INTEGER PRIMARY KEY," +
        "    task CHARACTER(30) NULL," +
        "    monsterskilled INTEGER NOT NULL DEFAULT 0," +
        "    exp INTEGER NOT NULL DEFAULT 0," +
        "    timeStarted INTEGER NOT NULL DEFAULT 0" +
        ");" +
        "CREATE TABLE inventory_item (" +
        "    id INTEGER PRIMARY KEY," +
        "    amount INTEGER NOT NULL," +
        "    equiped BIT(1) NOT NULL," +
        "    itemid INTEGER REFERENCES (id)," +
        ");" +
        "CREATE TABLE hero (" +
        "    id INTEGER PRIMARY KEY," +
        "    name CHARACTER(30) NOT NULL," +
        "    level INTEGER NOT NULL," +
        "    hpTotal INTEGER NOT NULL," +
        "    hpActual INTEGER NOT NULL," +
        "    xp INTEGER NOT NULL," +
        "    levelMaxXp INTEGER NOT NULL," +
        "    gold INTEGER NOT NULL," +
        "    deaths INTEGER NOT NULL," +
        "    monstersKilled INTEGER NOT NULL," +
        "    heroClass CHARACTER(30) NOT NULL," +
        "    shieldid INTEGER REFERENCES shield(id)," +
        "    weaponid INTEGER REFERENCES weapon(id)," +
        "    playstatusid INTEGER REFERENCES play_status(id)," +
        "    damageproficienceid INTEGER REFERENCES proficience(id)," +
        "    defenceproficienceid INTEGER REFERENCES proficience(id)," +
        ");"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
