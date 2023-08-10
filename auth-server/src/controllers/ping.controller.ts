import { Request, Response } from "express";
import { ReturnResponse, createResponse } from "../utils/response";
import { StatusCodes } from "../constants/statusCodes";
import { autoInjectable } from "tsyringe";
import { UserService } from "../services/user.service";
@autoInjectable()
export class PingController {
  private userService:UserService
constructor(userService:UserService){
  this.userService=userService
}

  ping(req: Request, res: Response):void {
    const response = createResponse<string>(  "success",
    StatusCodes.SUCCESS,
    "Pong");
    
    res.send(response);
  }

  verification(req: Request, res: Response){
    const response = createResponse<object>(  "success",
    StatusCodes.SUCCESS,
    "User verified");
    
 return   res.send(response);
   
  }
}