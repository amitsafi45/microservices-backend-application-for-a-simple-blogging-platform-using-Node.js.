import { Request, Response } from "express";
import { ReturnResponse, createResponse } from "../utils/response";
import { StatusCodes } from "../constants/statusCodes";
import { autoInjectable } from "tsyringe";
import { UserService } from "../services/user.service";
import { User } from "@prisma/client";
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

   async verification(req: Request, res: Response){




const user=req.user as User
    const response = createResponse<object>( true,
    StatusCodes.SUCCESS,
    "User verified",user)
  
    
 return   res.status(StatusCodes.SUCCESS).send(response);
   
  }
}