import { Request, Response } from "express";
import { ReturnResponse, createResponse } from "../utils/response";
import { StatusCodes } from "../constants/statusCodes";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class PingController {
 async ping(req: Request, res: Response){
    const response = createResponse<string>(  "success",
    StatusCodes.SUCCESS,
    "Pong");
    
 return res.send(response);
  }
}