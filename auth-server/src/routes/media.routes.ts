import { Router } from "express"
import {Upload} from "../middlewares/upload.middleware"
import {MediaController} from "../controllers/media.controller"
import { catchAsync } from "../utils/catchAsync"
import { container } from "tsyringe"
import Authentication from "../middlewares/Authentication.middleware"
import HttpException from "../utils/HttpException"
const router = Router()
const iocMediaContainer=container.resolve(MediaController)
const iocUploadContainer=container.resolve(Upload)
router.post('/upload-single',iocUploadContainer.single("media").bind(iocUploadContainer), catchAsync(iocMediaContainer.uploadSingle.bind(iocMediaContainer)))
router.all('/*',(req,res)=>{
    throw HttpException.notFound("Method Not Found  ")
  })
export default router