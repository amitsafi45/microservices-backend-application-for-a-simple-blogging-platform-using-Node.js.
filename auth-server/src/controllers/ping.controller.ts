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
    const response = createResponse<object>(  true,
    StatusCodes.SUCCESS,
    "Pong");
    
    res.status(StatusCodes.SUCCESS).send(response);
  }

  verification(req: Request, res: Response){
    const response = createResponse<object>( true,
    StatusCodes.SUCCESS,
    "User verified");
    
 return   res.status(StatusCodes.SUCCESS).send(response);
   
  }
}