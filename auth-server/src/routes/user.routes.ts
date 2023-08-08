import { Router } from "express";
import {UserController} from "../controllers/user.controller";
import { LoginDTO, ProfileDTO, RegisterDTO, UpdateRegisterDTO } from "../dtos/user.dto";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import { catchAsync } from "../utils/catchAsync";
import { container } from "tsyringe";
const router = Router();
const userIocContainer=container.resolve(UserController)
router.post('/login',
RequestValidator.validate(LoginDTO),
catchAsync(userIocContainer.login.bind(userIocContainer))
)

router.post('/profile',RequestValidator.validate(ProfileDTO),catchAsync(userIocContainer.createProfile.bind(userIocContainer)))


router.get('/refresh',
catchAsync(userIocContainer.refresh.bind(userIocContainer))
)

router.post(
  "/register",
  RequestValidator.validate(RegisterDTO),
  catchAsync(userIocContainer.register.bind(userIocContainer))
);
router.patch(
  "/",
  RequestValidator.validate(UpdateRegisterDTO),
  catchAsync(userIocContainer.update.bind(userIocContainer))
);
router.get("/", catchAsync(userIocContainer.gets.bind(userIocContainer)));
router.get("/:userID", catchAsync(userIocContainer.get.bind(userIocContainer)));
router.delete(
  "/:userID",
  catchAsync(userIocContainer.delete.bind(userIocContainer))
);

export default router;
