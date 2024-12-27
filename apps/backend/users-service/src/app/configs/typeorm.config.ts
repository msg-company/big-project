import * as dotenv from "dotenv";
import * as path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env.development") });

const dataSourceConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "changeme",
  database: process.env.POSTGRES_DB || "main_db",
  synchronize: false,
  entities: ["dist/app/resources/**/*.entity{.ts,.js}"],
  migrations: ["dist/app/migrations/*.js"],
  migrationsRun: false,
  logging: true,
};

const AppDataSource = new DataSource(dataSourceConfig);

export default AppDataSource;
