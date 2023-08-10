import { Router } from "express";
import {PingController} from "../controllers/ping.controller";
import { catchAsync } from "../utils/catchAsync";
import { container } from "tsyringe";
import { BlogController } from "../controllers/blog.controller";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import { CommentDTO, PostDTO, UpdatePostDTO } from "../dtos/blog.dto";
const router=Router()
const iocBlogContainer=container.resolve(BlogController)
router.post('/',RequestValidator.validate(PostDTO),catchAsync(iocBlogContainer.create.bind(iocBlogContainer)))
router.patch('/',RequestValidator.validate(UpdatePostDTO),catchAsync(iocBlogContainer.update.bind(iocBlogContainer)))
router.get('/',catchAsync(iocBlogContainer.gets.bind(iocBlogContainer)))
router.get('/:postID',catchAsync(iocBlogContainer.get.bind(iocBlogContainer)))
router.delete('/:postID',catchAsync(iocBlogContainer.delete.bind(iocBlogContainer)))
router.post('/comment',RequestValidator.validate(CommentDTO),catchAsync(iocBlogContainer.comment.bind(iocBlogContainer)))
router.patch('/comment',RequestValidator.validate(CommentDTO),catchAsync(iocBlogContainer.commentUpdate.bind(iocBlogContainer)))
router.delete('/delete/:commentID',catchAsync(iocBlogContainer.commentDelete.bind(iocBlogContainer)))
router.get('/comment/:postID',catchAsync(iocBlogContainer.getAllCommentByPostID.bind(iocBlogContainer)))
router.post('/like/:postID',catchAsync(iocBlogContainer.postLike.bind(iocBlogContainer)))
router.delete('/like/:postID',catchAsync(iocBlogContainer.postUnLike.bind(iocBlogContainer)))
router.post('/comment/like/:postID',catchAsync(iocBlogContainer.commentLike.bind(iocBlogContainer)))
router.delete('/comment/like/:postID',catchAsync(iocBlogContainer.commentUnLike.bind(iocBlogContainer)))
export default router