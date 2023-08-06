import { Router } from "express";
import RequestValidator from "../middlewares/RequestValidator.middleware";
import { RegisterDTO } from "../dtos/user.dto";
import { catchAsync } from "../utils/catchAsync";
import userController from "../controllers/user.controller";




const router=Router()
router.post('/register',RequestValidator.validate(RegisterDTO),catchAsync(userController.register.bind(userController)))
export default router