import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingMoreRelations61720538190226 implements MigrationInterface {
    name = 'FixingMoreRelations61720538190226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdBy" SET DEFAULT 'system'`);
        await queryRunner.query(`ALTER TABLE "service" ALTER COLUMN "createdDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "service" ALTER COLUMN "createdBy" SET DEFAULT 'system'`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "createdDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "createdBy" SET DEFAULT 'system'`);
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "createdDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "createdBy" SET DEFAULT 'system'`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "createdDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "createdBy" SET DEFAULT 'system'`);
        await queryRunner.query(`ALTER TABLE "assistant" ALTER COLUMN "createdDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "assistant" ALTER COLUMN "createdBy" SET DEFAULT 'system'`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "createdDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "createdBy" SET DEFAULT 'system'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "createdBy" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "createdDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "assistant" ALTER COLUMN "createdBy" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "assistant" ALTER COLUMN "createdDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "createdBy" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "createdDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "createdBy" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "createdDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "createdBy" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "createdDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "service" ALTER COLUMN "createdBy" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "service" ALTER COLUMN "createdDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdBy" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdDate" DROP DEFAULT`);
    }

}
