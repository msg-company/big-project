import { registerAs } from "@nestjs/config";
import * as dotenv from "dotenv";
import * as path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config({ path: path.resolve(__dirname, "../../../.env.development") });

const config = {
  type: "postgres",
  host: `${process.env.POSTGRES_HOST}`,
  port: `${process.env.POSTGRES_PORT}`,
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DB}`,
  entities: ["dist/app/resources/**/*.entity{.ts,.js}"],
  migrations: ["dist/app/migrations/*.js"],
  synchronize: false,
};

export default registerAs("typeorm", () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
