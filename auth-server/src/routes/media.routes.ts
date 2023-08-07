import { Router } from "express"
import {Upload} from "../middlewares/upload.middleware"
import {MediaController} from "../controllers/media.controller"
import { catchAsync } from "../utils/catchAsync"
import Authentication from "../middlewares/Authentication.middleware"
import { iocContainer } from "../utils/IoCContainer.utils"
const router = Router()
// router.use(Authentication.Check())
router.post('/upload/single', iocContainer.resolve(Upload).single("media"), catchAsync(iocContainer.resolve(MediaController).uploadSingle))
export default router