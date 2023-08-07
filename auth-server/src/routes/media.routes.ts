import { Router } from "express"
import upload from "../middlewares/upload.middleware"
import mediaController from "../controllers/media.controller"
import { catchAsync } from "../utils/catchAsync"
import Authentication from "../middlewares/Authentication.middleware"
const router = Router()
// router.use(Authentication.Check())
router.post('/upload/single', upload.single('media'), catchAsync(mediaController.uploadSingle.bind(mediaController)))
export default router