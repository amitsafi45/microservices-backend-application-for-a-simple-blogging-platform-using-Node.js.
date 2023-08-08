import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import { iocContainer } from "../utils/IoCContainer.utils";
import { PingController } from "../controllers/ping.controller";
const router=Router()
router.get('/',iocContainer.resolve(PingController).ping)
export default router