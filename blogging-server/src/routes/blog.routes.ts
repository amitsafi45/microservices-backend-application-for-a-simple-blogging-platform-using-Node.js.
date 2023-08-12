import { Router } from "express";
import {PingController} from "../controllers/ping.controller";
import { catchAsync } from "../utils/catchAsync";
import { container } from "tsyringe";
import { BlogController } from "../controllers/blog.controller";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import { CommentDTO, PostDTO, UpdateCommentDTO, UpdatePostDTO } from "../dtos/blog.dto";
import Authentication from "../middlewares/authentication.middleware";
const router=Router()
const iocBlogContainer=container.resolve(BlogController)
router.post('/',RequestValidator.validate(PostDTO),Authentication.Check(),catchAsync(iocBlogContainer.create.bind(iocBlogContainer)))
router.patch('/',RequestValidator.validate(UpdatePostDTO),Authentication.Check(),catchAsync(iocBlogContainer.update.bind(iocBlogContainer)))
router.get('/:postID',Authentication.Check(),catchAsync(iocBlogContainer.get.bind(iocBlogContainer)))
router.get('/',catchAsync(iocBlogContainer.gets.bind(iocBlogContainer)))
router.delete('/:postID',Authentication.Check(),catchAsync(iocBlogContainer.delete.bind(iocBlogContainer)))
router.post('/comment',RequestValidator.validate(CommentDTO),Authentication.Check(),catchAsync(iocBlogContainer.comment.bind(iocBlogContainer)))
router.patch('/comment',RequestValidator.validate(UpdateCommentDTO),Authentication.Check(),catchAsync(iocBlogContainer.commentUpdate.bind(iocBlogContainer)))
router.delete('/comment/:commentID',Authentication.Check(),catchAsync(iocBlogContainer.commentDelete.bind(iocBlogContainer)))
router.get('/comment/:postID',catchAsync(iocBlogContainer.getAllCommentByPostID.bind(iocBlogContainer)))
router.post('/like/:postID',Authentication.Check(),catchAsync(iocBlogContainer.postLike.bind(iocBlogContainer)))
router.delete('/like/:postID',Authentication.Check(),catchAsync(iocBlogContainer.postUnLike.bind(iocBlogContainer)))
router.post('/comment/like/:postID',Authentication.Check(),catchAsync(iocBlogContainer.commentLike.bind(iocBlogContainer)))
router.delete('/comment/like/:postID',Authentication.Check(),catchAsync(iocBlogContainer.commentUnLike.bind(iocBlogContainer)))
export default router