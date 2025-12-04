import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1764730970364 implements MigrationInterface {
    name = 'InitialSchema1764730970364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" ADD "id_externo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "id_externo"`);
    }

}
