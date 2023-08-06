import { Request, Response } from "express";
import { StatusCodes } from "../constants/statusCodes";
import { IUser, IUserController } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
import { ReturnResponse, createResponse } from "../utils/response";
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
   
    res.send(createResponse<string>("success",
    StatusCodes.SUCCESS,
    CreatedMessage("User"))
    );
  }
  async get(req: Request, res: Response): Promise<void> {
    const data = await this.userService.get(req.params.userID);
   
    res.send(createResponse<IUser>(
      "success",
      StatusCodes.SUCCESS,
      FetchMessage("User"),
      data)
    );
  }
  async gets(req: Request, res: Response): Promise<void> {
    const users = await this.userService.gets();

   
    res.send(createResponse<IUser>(
      "success",
      StatusCodes.SUCCESS,
      FetchMessage("List of user"),
      undefined,
      users)
    );
  }
  async delete(req: Request, res: Response): Promise<void> {
    await this.userService.delete(req.params.userID);
   
    res.send(createResponse<string>(
      "success",
      StatusCodes.SUCCESS,
      deletedMessage("User"))
    );
  }
  async update(req: Request, res: Response): Promise<void> {
    await this.userService.update(req.body);
  
    res.send(createResponse<string>(
      "success",
      StatusCodes.SUCCESS,
      UpdatedMessage("User"))
    );
  }
}
const userService =UserService.getInstance();
export default new UserController(userService);
