import { Router } from "express"
import { getClientTypes } from "../controllers/client-type.controller"

const router = Router()

router.get("/", getClientTypes)

export default router
