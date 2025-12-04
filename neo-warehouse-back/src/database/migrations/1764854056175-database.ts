import { MigrationInterface, QueryRunner } from "typeorm";

export class Database1764854056175 implements MigrationInterface {
    name = 'Database1764854056175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categoria" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying NOT NULL, CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "producto" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying NOT NULL, "precio" numeric NOT NULL, "stock" integer NOT NULL, "id_externo" character varying, "sku" character varying NOT NULL, "categoria_id" uuid, CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movimiento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cantidad" integer NOT NULL, "fecha" TIMESTAMP NOT NULL, "user" character varying NOT NULL, "producto_id" uuid NOT NULL, "tipo_movimiento_id" uuid NOT NULL, CONSTRAINT "PK_809988d143ce94a95f3d30164ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tipo_movimiento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo" character varying NOT NULL, CONSTRAINT "PK_9029b4ce24330535c285fbf70b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_1ae19a0cb542cf735d454bab0b5" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movimiento" ADD CONSTRAINT "FK_1bcf0360141f5e4f8875086d98f" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movimiento" ADD CONSTRAINT "FK_1b3887468dccf5a32c5ef6c8f64" FOREIGN KEY ("tipo_movimiento_id") REFERENCES "tipo_movimiento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        
        // Insert default movement types
        await queryRunner.query(`INSERT INTO "tipo_movimiento" ("tipo") VALUES ('Entrada')`);
        await queryRunner.query(`INSERT INTO "tipo_movimiento" ("tipo") VALUES ('Salida')`);
        await queryRunner.query(`INSERT INTO "tipo_movimiento" ("tipo") VALUES ('Ajuste')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movimiento" DROP CONSTRAINT "FK_1b3887468dccf5a32c5ef6c8f64"`);
        await queryRunner.query(`ALTER TABLE "movimiento" DROP CONSTRAINT "FK_1bcf0360141f5e4f8875086d98f"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_1ae19a0cb542cf735d454bab0b5"`);
        await queryRunner.query(`DROP TABLE "tipo_movimiento"`);
        await queryRunner.query(`DROP TABLE "movimiento"`);
        await queryRunner.query(`DROP TABLE "producto"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
    }

}
