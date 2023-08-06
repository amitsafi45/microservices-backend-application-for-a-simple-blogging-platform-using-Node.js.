import { Request, Response } from "express";
import { StatusCodes } from "../constants/statusCodes";
import { IUserController } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
import { ReturnResponse } from "../utils/response";
import { CreatedMessage } from "../utils/responseMessage.utils";

class UserController implements IUserController {
  public userService: UserService;
  constructor(userServices: UserService) {
    this.userService = userServices;
  }
  async register(req: Request, res: Response): Promise<void> {
    await this.userService.register(req.body);
    const response = new ReturnResponse(
      "success",
      StatusCodes.SUCCESS,
      CreatedMessage("User")
    );
    res.send(response);
  }
}
const userService = new UserService();
export default new UserController(userService);
