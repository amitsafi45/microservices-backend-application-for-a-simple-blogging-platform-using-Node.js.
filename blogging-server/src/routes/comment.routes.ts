import { Router } from "express";
import {PingController} from "../controllers/ping.controller";
import { catchAsync } from "../utils/catchAsync";
import { container } from "tsyringe";
import { BlogController } from "../controllers/blog.controller";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import { CommentDTO, CommentLikeDTO, PostDTO, UpdateCommentDTO, UpdatePostDTO } from "../dtos/blog.dto";
import Authentication from "../middlewares/authentication.middleware";
import HttpException from "../utils/HttpException";
const router=Router()
const iocBlogContainer=container.resolve(BlogController)

router.post('/',RequestValidator.validate(CommentDTO),Authentication.Check(),catchAsync(iocBlogContainer.comment.bind(iocBlogContainer)))
router.patch('/',RequestValidator.validate(UpdateCommentDTO),Authentication.Check(),catchAsync(iocBlogContainer.commentUpdate.bind(iocBlogContainer)))
router.delete('/unlike',RequestValidator.validate(CommentLikeDTO),Authentication.Check(),catchAsync(iocBlogContainer.commentUnLike.bind(iocBlogContainer)))
router.delete('/:commentID',Authentication.Check(),catchAsync(iocBlogContainer.commentDelete.bind(iocBlogContainer)))

router.get('/:postID',catchAsync(iocBlogContainer.getAllCommentByPostID.bind(iocBlogContainer)))
router.post('/like',RequestValidator.validate(CommentLikeDTO),Authentication.Check(),catchAsync(iocBlogContainer.commentLike.bind(iocBlogContainer)))

router.all('/*',(req,res)=>{
    throw HttpException.notFound("Method Not Found  ")
  })
export default router