import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageUrl1719800452249 implements MigrationInterface {
    name = 'AddImageUrl1719800452249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "imageUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "imageUrl"`);
    }

}
