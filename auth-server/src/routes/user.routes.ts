import { Router } from "express";
import {UserController} from "../controllers/user.controller";
import { LoginDTO, ProfileDTO, RegisterDTO, UpdateRegisterDTO } from "../dtos/user.dto";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import { catchAsync } from "../utils/catchAsync";
import { iocContainer } from "../utils/IoCContainer.utils";
const router = Router();
router.post('/login',
RequestValidator.validate(LoginDTO),
catchAsync(iocContainer.resolve(UserController).login)
)

router.post('/profile',RequestValidator.validate(ProfileDTO),catchAsync(iocContainer.resolve(UserController).createProfile))


router.get('/refresh',
catchAsync(iocContainer.resolve(UserController).refresh)
)

router.post(
  "/register",
  RequestValidator.validate(RegisterDTO),
  catchAsync(iocContainer.resolve(UserController).register)
);
router.patch(
  "/",
  RequestValidator.validate(UpdateRegisterDTO),
  catchAsync(iocContainer.resolve(UserController).update)
);
router.get("/", catchAsync(iocContainer.resolve(UserController).gets));
router.get("/:userID", catchAsync(iocContainer.resolve(UserController).get));
router.delete(
  "/:userID",
  catchAsync(iocContainer.resolve(UserController).delete)
);

export default router;
