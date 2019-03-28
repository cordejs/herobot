import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1548891232589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DROP TABLE IF EXISTS heroclass CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS equip CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS adventure CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS monster CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS playstatus CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS inventory_item CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS hero CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS weapon CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS shield CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS item CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS proficience CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS play_status CASCADE;");

    await queryRunner.query(
      "CREATE TABLE heroclass (" +
        "    id SERIAL," +
        "    name CHARACTER(30) NOT NULL," +
        "    damageBuff INTEGER NOT NULL," +
        "    shieldBuff INTEGER NOT NULL," +
        "    hpBuff INTEGER NOT NULL," +
        "    goldBuff INTEGER NOT NULL," +
        "    expBuff INTEGER NOT NULL," +
        "    attackSpeedBuff INTEGER NOT NULL," +
        "    PRIMARY KEY(id)" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE equip(" +
        "id SERIAL PRIMARY KEY," +
        "name CHARACTER(30) NOT NULL," +
        "level INTEGER NOT NULL," +
        "price INTEGER NOT NULL)"
    );

    await queryRunner.query(
      "CREATE TABLE proficience (" +
        "   id SERIAL PRIMARY KEY," +
        "    level INTEGER NOT NULL," +
        "    xp INTEGER NOT NULL," +
        "    levelMaxXp INTEGER NOT NULL" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE monster (" +
        "    id SERIAL PRIMARY KEY," +
        "    name CHARACTER(30) NOT NULL," +
        "    level INTEGER NOT NULL," +
        "    damage INTEGER NOT NULL," +
        "    hp INTEGER NOT NULL," +
        "    defence INTEGER NOT NULL," +
        "    givedxp INTEGER NOT NULL," +
        "    givedgold INTEGER NOT NULL," +
        "    equipDropChance INTEGER NOT NULL," +
        "    idEquipDrop SERIAL," +
        "    FOREIGN KEY (idEquipDrop) REFERENCES Equip(id)" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE item (" +
        "    id SERIAL PRIMARY KEY," +
        "    name CHARACTER(50) NOT NULL," +
        "    price INTEGER NOT NULL" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE shield (" +
        "    id SERIAL REFERENCES equip(id)," +
        "    defence INTEGER NOT NULL," +
        "    PRIMARY KEY(id)" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE weapon (" +
        "    id SERIAL REFERENCES equip(id)," +
        "    damage INTEGER NOT NULL," +
        "    PRIMARY KEY(id)" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE adventure (" +
        "    id SERIAL PRIMARY KEY," +
        "    level INTEGER NOT NULL," +
        "    name CHARACTER(40) NOT NULL," +
        "    idMonster INTEGER NOT NULL," +
        "    FOREIGN KEY(idMonster) REFERENCES monster(id)" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE play_status (" +
        "    id SERIAL PRIMARY KEY," +
        "    task CHARACTER(30) NOT NULL," +
        "    gold INTEGER NOT NULL," +
        "    monsterskilled INTEGER NOT NULL DEFAULT 0," +
        "    exp INTEGER NOT NULL DEFAULT 0," +
        "    timeStarted INTEGER NOT NULL DEFAULT 0," +
        "    idadventure SERIAL," +
        "    FOREIGN KEY (idadventure) REFERENCES adventure(id)" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE hero (" +
        "    id BIGINT PRIMARY KEY," +
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
        "    idShield INTEGER," +
        "    idWeapon INTEGER," +
        "    idPlayStatus INTEGER," +
        "    idDamageProficience INTEGER," +
        "    idDefenceProficience INTEGER," +
        "    idHeroClass INTEGER," +
        "    FOREIGN KEY(idShield) REFERENCES shield(id)," +
        "    FOREIGN KEY(idWeapon) REFERENCES weapon(id)," +
        "    FOREIGN KEY(idPlayStatus) REFERENCES play_status(id)," +
        "    FOREIGN KEY(idDamageProficience) REFERENCES proficience(id)," +
        "    FOREIGN KEY(idDefenceProficience) REFERENCES proficience(id)," +
        "    FOREIGN KEY(idHeroClass) REFERENCES heroclass(id)" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE inventory_item (" +
        "    id SERIAL PRIMARY KEY," +
        "    idhero BIGINT," +
        "    amount INTEGER NOT NULL," +
        "    equiped BIT(1) NOT NULL," +
        "    idItem INTEGER," +
        "    FOREIGN KEY(idItem) REFERENCES item(id)," +
        "    FOREIGN KEY(idhero) REFERENCES hero(id)" +
        ");"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
