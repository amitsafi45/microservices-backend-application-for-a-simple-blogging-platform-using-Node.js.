import { Router } from "express";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import { ApiDetail } from "../dtos/gateway.dto";
import { iocContainer } from "../utils/IoCContainer.utils";
import { GatewayController } from "../controllers/gateway.controller";

const router =Router()
router.post('/',RequestValidator.validate(ApiDetail),iocContainer.resolve(GatewayController).create)
export default router