import { Router } from "express";
import {PingController} from "../controllers/ping.controller";
import { catchAsync } from "../utils/catchAsync";
import { container } from "tsyringe";
import HttpException from "../utils/HttpException";
const router=Router()
const iocPingContainer=container.resolve(PingController)
router.get('/',iocPingContainer.ping.bind(iocPingContainer))
router.all('/*',(req,res)=>{
    throw HttpException.notFound("Method Not Found  ")
  })
export default router