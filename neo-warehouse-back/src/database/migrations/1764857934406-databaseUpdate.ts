import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseUpdate1764857934406 implements MigrationInterface {
    name = 'DatabaseUpdate1764857934406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movimiento" ADD "nota" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movimiento" DROP COLUMN "nota"`);
    }

}
