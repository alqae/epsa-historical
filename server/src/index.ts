import "dotenv/config"
import * as cors from "cors"
import * as express from "express"

import ConsumptionHistoryRoutes from "./routes/consumption-history.routes"
import ClientTypeRoutes from "./routes/client-type.routes"
import LinesRoutes from "./routes/lines.routes"
import { AppDataSource } from "./data-source"

(async () => {
  const PORT = process.env.PORT || 4000
  await AppDataSource.initialize();
  const app = express()
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:4200",
      credentials: true
    })
  )
  app.use("/consumption-history", ConsumptionHistoryRoutes);
  app.use("/lines", LinesRoutes);
  app.use("/client-types", ClientTypeRoutes);
  app.get("/", (_req, res) => res.send("hello"))
  app.listen(PORT, () => console.log("Server running on port " + PORT + "! 🚀"))
})()
