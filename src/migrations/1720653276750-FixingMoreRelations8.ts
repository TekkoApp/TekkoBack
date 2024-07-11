import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingMoreRelations81720653276750 implements MigrationInterface {
    name = 'FixingMoreRelations81720653276750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" ADD "back_id" character varying`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "front_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "front_id"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "back_id"`);
    }

}
