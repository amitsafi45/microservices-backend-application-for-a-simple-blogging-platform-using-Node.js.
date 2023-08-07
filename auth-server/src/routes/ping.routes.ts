import { Router } from "express";
import pingController from "../controllers/ping.controller";
import { catchAsync } from "../utils/catchAsync";
import Authentication from "../middlewares/Authentication.middleware";
const router=Router()
router.get('/',pingController.ping)
export default router