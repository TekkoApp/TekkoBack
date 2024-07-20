import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimeSheetRelation1721434406282 implements MigrationInterface {
    name = 'AddTimeSheetRelation1721434406282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "time_sheet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying NOT NULL DEFAULT 'system', "lastModifiedBy" character varying, "lastModifiedDate" TIMESTAMP, "delete_date" date, "day" character varying NOT NULL, "day_available" boolean NOT NULL, "time_from" integer, "time_to" integer, "supplierId" uuid, CONSTRAINT "PK_8da42b78e7fa0f70b119f9b2081" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "working_days"`);
        await queryRunner.query(`DROP TYPE "public"."supplier_working_days_enum"`);
        await queryRunner.query(`ALTER TABLE "time_sheet" ADD CONSTRAINT "FK_ab1e2468331eb8350316adcf16b" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheet" DROP CONSTRAINT "FK_ab1e2468331eb8350316adcf16b"`);
        await queryRunner.query(`CREATE TYPE "public"."supplier_working_days_enum" AS ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "working_days" "public"."supplier_working_days_enum" array`);
        await queryRunner.query(`DROP TABLE "time_sheet"`);
    }

}
