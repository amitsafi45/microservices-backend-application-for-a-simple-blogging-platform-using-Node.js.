import { Router } from "express";
import {PingController} from "../controllers/ping.controller";
import { catchAsync } from "../utils/catchAsync";
import Authentication from "../middlewares/Authentication.middleware";
import { container } from "tsyringe";
const router=Router()
const iocContainer=container.resolve(PingController)
router.get('/',iocContainer.ping.bind(iocContainer))
router.get('/verification',catchAsync(Authentication.Check()),iocContainer.verification)
export default router