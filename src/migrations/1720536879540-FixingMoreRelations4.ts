import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingMoreRelations41720536879540 implements MigrationInterface {
    name = 'FixingMoreRelations41720536879540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_4eac1339ce7dae545451c9a5d35"`);
        await queryRunner.query(`ALTER TABLE "service" RENAME COLUMN "suppliersId" TO "supplierId"`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_69332016d9ed50b846796b21a91" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_69332016d9ed50b846796b21a91"`);
        await queryRunner.query(`ALTER TABLE "service" RENAME COLUMN "supplierId" TO "suppliersId"`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_4eac1339ce7dae545451c9a5d35" FOREIGN KEY ("suppliersId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
