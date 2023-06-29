import "reflect-metadata"
import { DataSource } from "typeorm"
import { ConsumptionHistory } from "./entity/ConsumptionHistory"
import { Line } from "./entity/Line"

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [ConsumptionHistory, Line],
  migrations: [],
  subscribers: [],
  options: {
    trustServerCertificate: true,
  }
})
