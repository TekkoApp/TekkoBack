import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVerificationCodeColumn1720964431967 implements MigrationInterface {
    name = 'AddVerificationCodeColumn1720964431967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "verification_code" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verification_code"`);
    }

}
