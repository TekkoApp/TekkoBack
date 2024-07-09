import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingMoreRelations1720532975864 implements MigrationInterface {
    name = 'FixingMoreRelations1720532975864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_e8902c50550ff82dd0143913c0a"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "REL_e8902c50550ff82dd0143913c0"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "licenceUrl" text`);
        await queryRunner.query(`ALTER TABLE "location" ADD "supplierId" uuid`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "self_description" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."supplier_working_days_enum" AS ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "working_days" "public"."supplier_working_days_enum" array`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "estimated_fee" character varying`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_26564885f6dcd419f388d7f3646" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_26564885f6dcd419f388d7f3646"`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "estimated_fee"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "working_days"`);
        await queryRunner.query(`DROP TYPE "public"."supplier_working_days_enum"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "self_description"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "supplierId"`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "licenceUrl"`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "REL_e8902c50550ff82dd0143913c0" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_e8902c50550ff82dd0143913c0a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
