import { Router } from "express";
import {PingController} from "../controllers/ping.controller";
import { catchAsync } from "../utils/catchAsync";
import { container } from "tsyringe";
const router=Router()
const iocPingContainer=container.resolve(PingController)
router.get('/',iocPingContainer.ping.bind(iocPingContainer))
export default router