import { MigrationInterface, QueryRunner } from "typeorm";

export class FixEntities151721406784911 implements MigrationInterface {
    name = 'FixEntities151721406784911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "name" SET DEFAULT 'principal'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "name" DROP DEFAULT`);
    }

}
