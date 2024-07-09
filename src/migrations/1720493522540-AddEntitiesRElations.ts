import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEntitiesRElations1720493522540 implements MigrationInterface {
    name = 'AddEntitiesRElations1720493522540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_60f07247b200c2d33543d09b3f1"`);
        await queryRunner.query(`CREATE TABLE "assistant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL, "lastModifiedBy" character varying, "lastModifiedDate" TIMESTAMP, "delete_date" date, "photo_url" character varying, "phone" character varying, "background_url" character varying, "supplierId" uuid, CONSTRAINT "PK_eb7d5dbc702c098df659e65c606" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "deliveryId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_56f28841fe433cf13f8685f9bc1" UNIQUE ("clientId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "supplierId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_031cdc2c9c5eb56d48b5bdb4e54" UNIQUE ("supplierId")`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "street" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "state" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_031cdc2c9c5eb56d48b5bdb4e54" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assistant" ADD CONSTRAINT "FK_de3d433f56e59910b1a5e643802" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assistant" DROP CONSTRAINT "FK_de3d433f56e59910b1a5e643802"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_031cdc2c9c5eb56d48b5bdb4e54"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1"`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "street" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_031cdc2c9c5eb56d48b5bdb4e54"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "supplierId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_56f28841fe433cf13f8685f9bc1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "deliveryId" uuid`);
        await queryRunner.query(`ALTER TABLE "location" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "location" ADD "phone" character varying`);
        await queryRunner.query(`DROP TABLE "assistant"`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_60f07247b200c2d33543d09b3f1" FOREIGN KEY ("deliveryId") REFERENCES "delivery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
