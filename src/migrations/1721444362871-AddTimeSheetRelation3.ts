import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimeSheetRelation31721444362871 implements MigrationInterface {
    name = 'AddTimeSheetRelation31721444362871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheet" ALTER COLUMN "day_available" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheet" ALTER COLUMN "day_available" DROP DEFAULT`);
    }

}
