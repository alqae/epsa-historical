import { Router } from "express"
import { getConsumptionHistory } from "../controllers/onsumption-history.controller"

const router = Router()

router.get("/", getConsumptionHistory)

export default router
