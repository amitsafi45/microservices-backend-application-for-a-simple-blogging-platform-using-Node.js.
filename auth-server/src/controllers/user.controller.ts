import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IUserController } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";

class UserController implements IUserController {
  public userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }
  async register(req: Request, res: Response) {
    await this.userService.register(req.body);
    res.send("done");
  }
}
const userService = new UserService();
export default new UserController(userService);
