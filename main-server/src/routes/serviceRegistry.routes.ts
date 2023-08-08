import { Router } from "express";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import { ApiDetail } from "../dtos/gateway.dto";
import { GatewayController } from "../controllers/gateway.controller";
import { container } from "tsyringe";
import { catchAsync } from "../utils/catchAsync";

const router =Router()
const gatewayContainer=container.resolve(GatewayController)
router.post('/',RequestValidator.validate(ApiDetail),catchAsync(gatewayContainer.create.bind(gatewayContainer)))
export default router