import { Router } from "express";
import {PingController} from "../controllers/ping.controller";
import { catchAsync } from "../utils/catchAsync";
import { container } from "tsyringe";
import { PostController } from "../controllers/post.controller";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import { PostDTO, UpdatePostDTO } from "../dtos/blog.dto";
const router=Router()
const iocPostContainer=container.resolve(PostController)
router.post('/',RequestValidator.validate(PostDTO),catchAsync(iocPostContainer.create.bind(iocPostContainer)))
router.patch('/',RequestValidator.validate(UpdatePostDTO),catchAsync(iocPostContainer.update.bind(iocPostContainer)))
router.get('/',catchAsync(iocPostContainer.gets.bind(iocPostContainer)))
router.get('/:postID',catchAsync(iocPostContainer.get.bind(iocPostContainer)))
router.delete('/:postID',catchAsync(iocPostContainer.delete.bind(iocPostContainer)))
export default router