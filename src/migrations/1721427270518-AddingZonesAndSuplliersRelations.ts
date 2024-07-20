import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingZonesAndSuplliersRelations1721427270518 implements MigrationInterface {
    name = 'AddingZonesAndSuplliersRelations1721427270518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zone" DROP CONSTRAINT "FK_be066909812c280ad4d5549fac2"`);
        await queryRunner.query(`ALTER TABLE "zone" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "zone" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "zone" DROP COLUMN "supplierId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zone" ADD "supplierId" uuid`);
        await queryRunner.query(`ALTER TABLE "zone" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "zone" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "zone" ADD CONSTRAINT "FK_be066909812c280ad4d5549fac2" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
