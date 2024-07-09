import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingMoreRelations71720555014257 implements MigrationInterface {
    name = 'FixingMoreRelations71720555014257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_ad3b4bf8dd18a1d467c5c0fc13a"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "REL_ad3b4bf8dd18a1d467c5c0fc13"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "REL_ad3b4bf8dd18a1d467c5c0fc13" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_ad3b4bf8dd18a1d467c5c0fc13a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
