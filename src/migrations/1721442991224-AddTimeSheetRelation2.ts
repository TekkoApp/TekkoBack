import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimeSheetRelation21721442991224 implements MigrationInterface {
    name = 'AddTimeSheetRelation21721442991224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supplier_zones" ("supplier_id" uuid NOT NULL, "zone_id" uuid NOT NULL, CONSTRAINT "PK_c905c81ee2ad16c47bf3b27e42e" PRIMARY KEY ("supplier_id", "zone_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3837b852ad412dc8275007c115" ON "supplier_zones" ("supplier_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cf70a3230fc527e81f19a8ba31" ON "supplier_zones" ("zone_id") `);
        await queryRunner.query(`ALTER TABLE "supplier_zones" ADD CONSTRAINT "FK_3837b852ad412dc8275007c115b" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "supplier_zones" ADD CONSTRAINT "FK_cf70a3230fc527e81f19a8ba311" FOREIGN KEY ("zone_id") REFERENCES "zone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier_zones" DROP CONSTRAINT "FK_cf70a3230fc527e81f19a8ba311"`);
        await queryRunner.query(`ALTER TABLE "supplier_zones" DROP CONSTRAINT "FK_3837b852ad412dc8275007c115b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf70a3230fc527e81f19a8ba31"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3837b852ad412dc8275007c115"`);
        await queryRunner.query(`DROP TABLE "supplier_zones"`);
    }

}
