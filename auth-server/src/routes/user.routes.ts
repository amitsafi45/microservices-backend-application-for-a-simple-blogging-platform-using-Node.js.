import { Router } from "express";
import userController from "../controllers/user.controller";
import { LoginDTO, RegisterDTO, UpdateRegisterDTO } from "../dtos/user.dto";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import { catchAsync } from "../utils/catchAsync";

const router = Router();
router.post('/login',
RequestValidator.validate(LoginDTO),
catchAsync(userController.login.bind(userController))
)

router.get('/refresh',
catchAsync(userController.refresh.bind(userController))
)

router.post(
  "/register",
  RequestValidator.validate(RegisterDTO),
  catchAsync(userController.register.bind(userController))
);
router.patch(
  "/",
  RequestValidator.validate(UpdateRegisterDTO),
  catchAsync(userController.update.bind(userController))
);
router.get("/", catchAsync(userController.gets.bind(userController)));
router.get("/:userID", catchAsync(userController.get.bind(userController)));
router.delete(
  "/:userID",
  catchAsync(userController.delete.bind(userController))
);

export default router;
