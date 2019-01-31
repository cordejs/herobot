import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1548895699089 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.renameColumn("monster", "shield", "defence");
        await queryRunner.renameColumn("play_status", "action", "task");

        queryRunner.hasTable("item_iventory").then(exists => {
            if (exists) {
                queryRunner.dropTable("item_inventory");
            }
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
