import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1549740124536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.hasColumn("monster", "defence").then(exists => {
      if (!exists) {
        queryRunner.query("ALTER TABLE monster ADD defence INTEGER NOT NULL");
      }
    });

    await queryRunner.hasTable("equip").then(exists => {
      if (!exists) {
        queryRunner.query(
          "CREATE TABLE equip(" +
            "id SERIAL PRIMARY KEY," +
            "name CHARACTER(30) NOT NULL," +
            "price INTEGER NOT NULL)"
        );
      }
    });

    await queryRunner.hasColumn("monster", "idEquipDrop").then(exists => {
      if (!exists) {
        queryRunner
          .query("ALTER TABLE monster ADD idEquipDrop SERIAL")
          .then(() => {
            queryRunner.query(
              "ALTER TABLE monster ADD CONSTRAINT " +
                " fk_equipDrop FOREIGN KEY (idEquipDrop) REFERENCES Equip(id)"
            );
          });
      }
    });

    await queryRunner.hasColumn("monster", "equipDropChance").then(exists => {
      if (!exists) {
        queryRunner.query(
          "ALTER TABLE monster ADD equipDropChance INTEGER NULL"
        );
      }
    });

    await queryRunner.hasColumn("monster", "gold").then(exists => {
      if (!exists) {
        queryRunner.query("ALTER TABLE monster ADD gold INTEGER NULL");
      }
    });

    await queryRunner.hasTable("shield").then(exists => {
      if (exists) {
        queryRunner.query("DROP TABLE shield CASCADE").then(() => {
          queryRunner.query(
            "CREATE TABLE shield (" +
              "    id SERIAL PRIMARY KEY," +
              "    idEquip SERIAL," +
              "    defence INTEGER NOT NULL," +
              "    FOREIGN KEY(idEquip) REFERENCES Equip(id)" +
              ");"
          );
        });
      }
    });

    await queryRunner.hasTable("weapon").then(exists => {
      if (exists) {
        queryRunner.query("DROP TABLE weapon CASCADE").then(() => {
          queryRunner.query(
            "CREATE TABLE weapon (" +
              "    id SERIAL PRIMARY KEY," +
              "    idEquip SERIAL," +
              "    damage INTEGER NOT NULL," +
              "    FOREIGN KEY(idEquip) REFERENCES Equip(id)" +
              ");"
          );
        });
      }
    });

    await queryRunner.hasTable("bag").then(exists => {
      if (!exists) {
        queryRunner.query(
          "CREATE TABLE bag (" +
            "    id SERIAL PRIMARY KEY," +
            "    idHero SERIAL NOT NULL," +
            "    idEquip SERIAL NOT NULL," +
            "    FOREIGN KEY(idHero) REFERENCES Hero(id)," +
            "    FOREIGN KEY(idEquip) REFERENCES Equip(id)" +
            ");"
        );
      }
    });

    await queryRunner.hasTable("heroclass").then(exists => {
      if (!exists) {
        queryRunner.query(
          "CREATE TABLE heroclass (" +
            "    id SERIAL PRIMARY KEY," +
            "    name CHARACTER(30) NOT NULL," +
            "    damageBuff INTEGER NOT NULL," +
            "    shieldBuff INTEGER NOT NULL," +
            "    hpBuff INTEGER NOT NULL," +
            "    goldBuff INTEGER NOT NULL," +
            "    expBuff INTEGER NOT NULL," +
            "    attackSpeedBuff INTEGER NOT NULL" +
            ");"
        );
      }
    });

    await queryRunner.hasColumn("hero", "heroclass").then(exists => {
      if (exists) {
        queryRunner.dropColumn("hero", "heroclass");
      }
      queryRunner.query("ALTER TABLE hero ADD idHeroClass SERIAL").then(() => {
        queryRunner.query(
          "ALTER TABLE hero ADD CONSTRAINT " +
            " fk_heroClass FOREIGN KEY (idHeroClass) REFERENCES HeroClass(id)"
        );
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
