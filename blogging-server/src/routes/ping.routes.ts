import { Router } from "express";
import {PingController} from "../controllers/ping.controller";
import { catchAsync } from "../utils/catchAsync";
import { iocContainer } from "../utils/IoCContainer.utils";
const router=Router()
router.get('/',iocContainer.resolve(PingController).ping)
export default router