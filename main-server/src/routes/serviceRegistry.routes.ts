import { Router } from "express";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import { ApiDetail } from "../dtos/gateway.dto";
import { ServiceRegistryController } from "../controllers/serviceRegistry.controller";
import { container } from "tsyringe";
import { catchAsync } from "../utils/catchAsync";

const router =Router()
const serviceRegistryContainer=container.resolve(ServiceRegistryController)
router.put('/',RequestValidator.validate(ApiDetail),catchAsync(serviceRegistryContainer.create.bind(serviceRegistryContainer)))
export default router