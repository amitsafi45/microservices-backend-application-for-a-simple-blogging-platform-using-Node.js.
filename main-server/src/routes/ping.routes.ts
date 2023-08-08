import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import { PingController } from "../controllers/ping.controller";
import { container } from "tsyringe";
const router=Router()
const iocContainer=container.resolve(PingController)
router.get('/',catchAsync(iocContainer.ping.bind(iocContainer)))
export default router