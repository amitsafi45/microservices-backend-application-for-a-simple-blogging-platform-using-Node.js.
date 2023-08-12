import { Router } from "express";
import {UserController} from "../controllers/user.controller";
import { LoginDTO, ProfileDTO, RegisterDTO, UpdateProfileDTO, UpdateRegisterDTO } from "../dtos/user.dto";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import { catchAsync } from "../utils/catchAsync";
import { container } from "tsyringe";
import Authentication from "../middlewares/Authentication.middleware";
const router = Router();
const userIocContainer=container.resolve(UserController)
router.post('/check',(req,res)=>{console.log(req.method,req.body) 
  return res.send("hello sir")})
router.post('/login',
RequestValidator.validate(LoginDTO),
catchAsync(userIocContainer.login.bind(userIocContainer))
)

router.post('/profile',RequestValidator.validate(ProfileDTO) ,Authentication.Check(),catchAsync(userIocContainer.createProfile.bind(userIocContainer)))


router.get('/refresh',
catchAsync(userIocContainer.refresh.bind(userIocContainer))
)
router.get('/logout',Authentication.Check(),catchAsync(userIocContainer.logout.bind(userIocContainer)))
router.post(
  "/register",

  RequestValidator.validate(RegisterDTO),
  catchAsync(userIocContainer.register.bind(userIocContainer))
);
  router.patch(
    "/profile",
  Authentication.Check(),
    RequestValidator.validate(UpdateProfileDTO),
    catchAsync(userIocContainer.updateProfile.bind(userIocContainer))
  );
router.get("/me",Authentication.Check(), catchAsync(userIocContainer.get.bind(userIocContainer)));
router.delete(
  "/deactivate",Authentication.Check(),
  catchAsync(userIocContainer.deactivate.bind(userIocContainer))
);

export default router;
