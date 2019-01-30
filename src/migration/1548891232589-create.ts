import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1548891232589 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE IF EXISTS adventure; " +
            "DROP TABLE IF EXISTS monster;" +
            "DROP TABLE IF EXISTS playstatus;" +
            "DROP TABLE IF EXISTS inventory_item;" +
            "DROP TABLE IF EXISTS hero;" +
            "DROP TABLE IF EXISTS weapon;" +
            "DROP TABLE IF EXISTS shield;" +
            "DROP TABLE IF EXISTS item;" +
            "DROP TABLE IF EXISTS proficience;" +
            "DROP TABLE IF EXISTS play_status;" +

            "CREATE TABLE proficience (" +
            "   id SERIAL PRIMARY KEY," +
            "    level INTEGER NOT NULL," +
            "    xp INTEGER NOT NULL," +
            "    levelMaxXp INTEGER NOT NULL" +
            ");" +

            "CREATE TABLE monster (" +
            "    id SERIAL PRIMARY KEY," +
            "    name CHARACTER(30) NOT NULL," +
            "    level INTEGER NOT NULL," +
            "    damage INTEGER NOT NULL," +
            "            hp INTEGER NOT NULL," +
            "    shield INTEGER NOT NULL," +
            "    givedxp INTEGER NOT NULL," +
            "    givedgold INTEGER NOT NULL" +
            ");" +

            "CREATE TABLE item (" +
            "    id SERIAL PRIMARY KEY," +
            "    name CHARACTER(50) NOT NULL," +
            "    price INTEGER NOT NULL" +
            ");" +

            "CREATE TABLE shield (" +
            "    id SERIAL PRIMARY KEY," +
            "    defence INTEGER NOT NULL," +
            "    idItem SERIAL," +
            "    FOREIGN KEY(idItem) REFERENCES item(id)" +
            ");" +

            "CREATE TABLE weapon (" +
            "    id SERIAL PRIMARY KEY," +
            "    damage INTEGER NOT NULL," +
            "    idItem SERIAL," +
            "    FOREIGN KEY(idItem) REFERENCES item(id)" +
            ");" +

            "CREATE TABLE adventure (" +
            "    id SERIAL PRIMARY KEY," +
            "    level INTEGER NOT NULL," +
            "    name CHARACTER(40) NOT NULL," +
            "    idMonster SERIAL NOT NULL," +
            "    FOREIGN KEY(idMonster) REFERENCES monster(id)" +
            ");" +

            "CREATE TABLE play_status (" +
            "    id SERIAL PRIMARY KEY," +
            "    action CHARACTER(30) NOT NULL," +
            "    monsterskilled INTEGER NOT NULL," +
            "    exp INTEGER NOT NULL," +
            "    timeStarted INTEGER NOT NULL" +
            ");" +

            "CREATE TABLE inventory_item (" +
            "    id SERIAL PRIMARY KEY," +
            "    amount INTEGER NOT NULL," +
            "    equiped BIT(1) NOT NULL," +
            "    idItem SERIAL," +
            "    FOREIGN KEY(idItem) REFERENCES item(id)" +
            ");" +

            "CREATE TABLE hero (" +
            "    id SERIAL PRIMARY KEY," +
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
            "    idShield SERIAL," +
            "    idWeapon SERIAL," +
            "    idPlayStatus SERIAL," +
            "    idDamageProficience SERIAL," +
            "    idDefenceProficience SERIAL," +
            "    FOREIGN KEY(idShield) REFERENCES shield(id)," +
            "    FOREIGN KEY(idWeapon) REFERENCES weapon(id)," +
            "    FOREIGN KEY(idPlayStatus) REFERENCES play_status(id)," +
            "    FOREIGN KEY(idDamageProficience) REFERENCES proficience(id)," +
            "    FOREIGN KEY(idDefenceProficience) REFERENCES proficience(id)" +
            ");");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
