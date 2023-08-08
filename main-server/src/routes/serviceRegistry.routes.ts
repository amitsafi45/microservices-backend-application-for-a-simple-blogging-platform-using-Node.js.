import { Router } from "express";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import { ApiDetail, ServiceStatusDTO } from "../dtos/gateway.dto";
import { ServiceRegistryController } from "../controllers/serviceRegistry.controller";
import { container } from "tsyringe";
import { catchAsync } from "../utils/catchAsync";
import { PingController } from "../controllers/ping.controller";

const router =Router()
const serviceRegistryContainer=container.resolve(ServiceRegistryController)
const iocContainer=container.resolve(PingController)
router.get('/ping',catchAsync(iocContainer.ping.bind(iocContainer)))
router.post('/register',RequestValidator.validate(ApiDetail),catchAsync(serviceRegistryContainer.create.bind(serviceRegistryContainer)))
router.patch('/update',RequestValidator.validate(ApiDetail),catchAsync(serviceRegistryContainer.update.bind(serviceRegistryContainer)))
router.patch('/status',RequestValidator.validate(ServiceStatusDTO),catchAsync(serviceRegistryContainer.updateStatus.bind(serviceRegistryContainer)))
export default router