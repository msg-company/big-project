import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735246057109 implements MigrationInterface {
    name = 'Migration1735246057109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."users_login"`);
        await queryRunner.query(`DROP INDEX "public"."users_updated_at"`);
        await queryRunner.query(`DROP INDEX "public"."uniq_external_id"`);
        await queryRunner.query(`DROP INDEX "public"."uniq_external_login"`);
        await queryRunner.query(`DROP INDEX "public"."users_email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "pk_users"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "uuid"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "login"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "crypted_password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hash_method"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "external_login"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "external_identity_provider"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "external_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_local"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "homepage_type"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "homepage_parameter"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_connection_date"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_sonarlint_connection"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."id" IS 'Уникальный идентификатор пользователя'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."username" IS 'Уникальное имя пользователя'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" character varying(50) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."firstName" IS 'Имя пользователя'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying(50) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastName" IS 'Фамилия пользователя'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."password" IS 'Хэшированный пароль'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."isActive" IS 'Активен ли пользователь'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" text`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."roles" IS 'Роли пользователя'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS 'Дата создания пользователя'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updatedAt" IS 'Дата последнего обновления'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS 'Электронная почта пользователя'`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updatedAt" IS 'Дата последнего обновления'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS 'Дата создания пользователя'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."roles" IS 'Роли пользователя'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."isActive" IS 'Активен ли пользователь'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."password" IS 'Хэшированный пароль'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastName" IS 'Фамилия пользователя'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."firstName" IS 'Имя пользователя'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."username" IS 'Уникальное имя пользователя'`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."id" IS 'Уникальный идентификатор пользователя'`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_sonarlint_connection" bigint`);
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_password" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" bigint`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" bigint`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_connection_date" bigint`);
        await queryRunner.query(`ALTER TABLE "users" ADD "homepage_parameter" character varying(40)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "homepage_type" character varying(40)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_local" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "external_id" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "external_identity_provider" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "external_login" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ADD "hash_method" character varying(10)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "salt" character varying(40)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "crypted_password" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "login" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "uuid" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "pk_users" PRIMARY KEY ("uuid")`);
        await queryRunner.query(`CREATE INDEX "users_email" ON "users" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "uniq_external_login" ON "users" ("external_login", "external_identity_provider") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "uniq_external_id" ON "users" ("external_identity_provider", "external_id") `);
        await queryRunner.query(`CREATE INDEX "users_updated_at" ON "users" ("updated_at") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_login" ON "users" ("login") `);
    }

}
