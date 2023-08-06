import { Request, Response } from "express";
import { StatusCodes } from "../constants/statusCodes";
import { IUserController } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
import { ReturnResponse } from "../utils/response";
import {
  CreatedMessage,
  FetchMessage,
  UpdatedMessage,
  deletedMessage,
} from "../utils/responseMessage.utils";

class UserController implements IUserController {
  private userService: UserService;
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
  async get(req: Request, res: Response): Promise<void> {
    const data = await this.userService.get(req.params.userID);
    const response = new ReturnResponse(
      "success",
      StatusCodes.SUCCESS,
      FetchMessage("User"),
      data
    );
    res.send(response);
  }
  async gets(req: Request, res: Response): Promise<void> {
    const users=await this.userService.gets()

    const response = new ReturnResponse(
      "success",
      StatusCodes.SUCCESS,
      FetchMessage("List of user"),
      undefined,
      users
    );
    res.json(response);
  }
  async delete(req: Request, res: Response): Promise<void> {
    await this.userService.delete(req.params.userID);
    const response = new ReturnResponse(
      "success",
      StatusCodes.SUCCESS,
      deletedMessage("User")
    );
    res.send(response);
  }
  async update(req: Request, res: Response): Promise<void> {
    await this.userService.update(req.body);
    const response = new ReturnResponse(
      "success",
      StatusCodes.SUCCESS,
      UpdatedMessage("User")
    );
    res.send(response);
  }
}
const userService = new UserService();
export default new UserController(userService);
