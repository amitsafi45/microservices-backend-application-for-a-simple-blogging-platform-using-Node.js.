import { Router } from "express"
import {Upload} from "../middlewares/upload.middleware"
import {MediaController} from "../controllers/media.controller"
import { catchAsync } from "../utils/catchAsync"
import { container } from "tsyringe"
import Authentication from "../middlewares/Authentication.middleware"
const router = Router()
const iocMediaContainer=container.resolve(MediaController)
const iocUploadContainer=container.resolve(Upload)
router.post('/upload/single',Authentication.Check(), iocUploadContainer.single("media").bind(iocUploadContainer), catchAsync(iocMediaContainer.uploadSingle.bind(iocMediaContainer)))
export default router