import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingMoreRelations31720535261383 implements MigrationInterface {
    name = 'FixingMoreRelations31720535261383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" ADD "suppliersId" uuid`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_4eac1339ce7dae545451c9a5d35" FOREIGN KEY ("suppliersId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_4eac1339ce7dae545451c9a5d35"`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "suppliersId"`);
    }

}
