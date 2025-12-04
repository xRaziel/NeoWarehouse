import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1764732559358 implements MigrationInterface {
    name = 'InitialSchema1764732559358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "precio"`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "precio" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "precio"`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "precio" integer NOT NULL`);
    }

}
