import { Router } from "express"
import { getLines } from "../controllers/lines.controller"

const router = Router()

router.get("/", getLines)

export default router
