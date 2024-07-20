import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingZones1721419083671 implements MigrationInterface {
    name = 'AddingZones1721419083671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "zone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying NOT NULL DEFAULT 'system', "lastModifiedBy" character varying, "lastModifiedDate" TIMESTAMP, "delete_date" date, "name" character varying NOT NULL, "coordinates" jsonb NOT NULL, "center" jsonb, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "supplierId" uuid, CONSTRAINT "PK_bd3989e5a3c3fb5ed546dfaf832" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "gender" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "zone" ADD CONSTRAINT "FK_be066909812c280ad4d5549fac2" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zone" DROP CONSTRAINT "FK_be066909812c280ad4d5549fac2"`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "gender" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "zone"`);
    }

}
