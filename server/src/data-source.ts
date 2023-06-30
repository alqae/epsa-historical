import "reflect-metadata"
import { DataSource } from "typeorm"

import { ConsumptionHistory } from "./entity/ConsumptionHistory"
import { ClientType } from "./entity/ClientType"
import { Line } from "./entity/Line"

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [ConsumptionHistory, Line, ClientType],
  migrations: [],
  subscribers: [],
  options: {
    trustServerCertificate: true,
  }
})
