import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelations61721701596344 implements MigrationInterface {
    name = 'FixRelations61721701596344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" ADD "birth_date" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "birth_date"`);
    }

}
