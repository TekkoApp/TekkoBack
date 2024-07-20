import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingGenderColumn1721413746475 implements MigrationInterface {
    name = 'AddingGenderColumn1721413746475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."supplier_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "gender" "public"."supplier_gender_enum" NOT NULL DEFAULT 'OTHER'`);
        await queryRunner.query(`UPDATE "supplier" SET "gender" = 'OTHER'`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "gender" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."supplier_gender_enum"`);
    }
}
