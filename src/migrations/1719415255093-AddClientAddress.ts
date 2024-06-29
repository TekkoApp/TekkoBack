import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClientAddress1719415255093 implements MigrationInterface {
    name = 'AddClientAddress1719415255093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."service_type_enum" AS ENUM('plumbing', 'locksmith', 'electrical', 'carpentry', 'painting')`);
        await queryRunner.query(`CREATE TABLE "service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL, "lastModifiedBy" character varying, "lastModifiedDate" TIMESTAMP, "delete_date" date, "price_per_hour" integer, "observations" character varying, "type" "public"."service_type_enum" NOT NULL, "deliveryId" uuid, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."delivery_status_enum" AS ENUM('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "delivery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL, "lastModifiedBy" character varying, "lastModifiedDate" TIMESTAMP, "delete_date" date, "status" "public"."delivery_status_enum" NOT NULL, "start_hour" TIMESTAMP, "finish_hour" TIMESTAMP, "cost" numeric, "observations" character varying, "attached" text, "clientId" uuid, "supplierId" uuid, "serviceId" uuid, CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL, "lastModifiedBy" character varying, "lastModifiedDate" TIMESTAMP, "delete_date" date, "photo_url" character varying, "userId" uuid, CONSTRAINT "REL_ad3b4bf8dd18a1d467c5c0fc13" UNIQUE ("userId"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL, "lastModifiedBy" character varying, "lastModifiedDate" TIMESTAMP, "delete_date" date, "name" character varying, "phone" character varying, "email" character varying, "street" character varying, "zip_code" character varying, "state" character varying, "city" character varying, "number" character varying, "apartment" character varying, "reference" character varying, "latitud" character varying, "longitud" character varying, "country" character varying, "clientId" uuid, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supplier" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL, "lastModifiedBy" character varying, "lastModifiedDate" TIMESTAMP, "delete_date" date, "photo_url" character varying, "phone" character varying, "background_url" character varying, "userId" uuid, CONSTRAINT "REL_e8902c50550ff82dd0143913c0" UNIQUE ("userId"), CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedDate"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastModifiedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastModifiedDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "delete_date" date`);
        await queryRunner.query(`ALTER TABLE "user" ADD "first_name" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "activated" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_60f07247b200c2d33543d09b3f1" FOREIGN KEY ("deliveryId") REFERENCES "delivery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery" ADD CONSTRAINT "FK_832ccc00150948aef24baec9a07" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery" ADD CONSTRAINT "FK_5eaafc706ef251d36371f402dfc" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery" ADD CONSTRAINT "FK_64edf30460f93736177eccf11cd" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_ad3b4bf8dd18a1d467c5c0fc13a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_7b7fca91946d2507bcc9bf4e407" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_e8902c50550ff82dd0143913c0a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_e8902c50550ff82dd0143913c0a"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_7b7fca91946d2507bcc9bf4e407"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_ad3b4bf8dd18a1d467c5c0fc13a"`);
        await queryRunner.query(`ALTER TABLE "delivery" DROP CONSTRAINT "FK_64edf30460f93736177eccf11cd"`);
        await queryRunner.query(`ALTER TABLE "delivery" DROP CONSTRAINT "FK_5eaafc706ef251d36371f402dfc"`);
        await queryRunner.query(`ALTER TABLE "delivery" DROP CONSTRAINT "FK_832ccc00150948aef24baec9a07"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_60f07247b200c2d33543d09b3f1"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "activated"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "delete_date"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastModifiedDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastModifiedBy"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "supplier"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "delivery"`);
        await queryRunner.query(`DROP TYPE "public"."delivery_status_enum"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TYPE "public"."service_type_enum"`);
    }

}
