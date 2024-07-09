import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingMoreRelations51720537297549 implements MigrationInterface {
    name = 'FixingMoreRelations51720537297549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_e8902c50550ff82dd0143913c0a"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "UQ_e8902c50550ff82dd0143913c0a"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "UQ_e8902c50550ff82dd0143913c0a" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_e8902c50550ff82dd0143913c0a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
