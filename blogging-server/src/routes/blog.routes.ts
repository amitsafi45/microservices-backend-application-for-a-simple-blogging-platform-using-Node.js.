import { Router } from "express";
import { PingController } from "../controllers/ping.controller";
import { catchAsync } from "../utils/catchAsync";
import { container } from "tsyringe";
import { BlogController } from "../controllers/blog.controller";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import {
  CommentDTO,
  PostDTO,
  PostLikeDTO,
  UpdateCommentDTO,
  UpdatePostDTO,
} from "../dtos/blog.dto";
import Authentication from "../middlewares/authentication.middleware";
import HttpException from "../utils/HttpException";
const router = Router();
const iocBlogContainer = container.resolve(BlogController);
router.post(
  "/",
  RequestValidator.validate(PostDTO),
  Authentication.Check(),
  catchAsync(iocBlogContainer.create.bind(iocBlogContainer))
);
router.patch(
  "/",
  RequestValidator.validate(UpdatePostDTO),
  Authentication.Check(),
  catchAsync(iocBlogContainer.update.bind(iocBlogContainer))
);
router.get(
  "/my-post",
  Authentication.Check(),
  catchAsync(iocBlogContainer.myPost.bind(iocBlogContainer))
);
router.get("/:postID", catchAsync(iocBlogContainer.get.bind(iocBlogContainer)));
router.get("/", catchAsync(iocBlogContainer.gets.bind(iocBlogContainer)));
router.delete(
  "/unlike",
  RequestValidator.validate(PostLikeDTO),
  Authentication.Check(),
  catchAsync(iocBlogContainer.postUnLike.bind(iocBlogContainer))
);
router.delete(
  "/:postID",
  Authentication.Check(),
  catchAsync(iocBlogContainer.delete.bind(iocBlogContainer))
);

router.post(
  "/like",
  RequestValidator.validate(PostLikeDTO),
  Authentication.Check(),
  catchAsync(iocBlogContainer.postLike.bind(iocBlogContainer))
);

router.all("/*", (req, res) => {
  throw HttpException.notFound("Method Not Found  ");
});
export default router;
