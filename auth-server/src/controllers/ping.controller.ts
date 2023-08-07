import { Request, Response } from "express";
import { ReturnResponse, createResponse } from "../utils/response";
import { StatusCodes } from "../constants/statusCodes";
import { iocContainer } from "../utils/IoCContainer.utils";

export class PingController {
  ping(req: Request, res: Response):void {
    const response = createResponse<string>(  "success",
    StatusCodes.SUCCESS,
    "Pong");
    
    res.send(response);
  }
}
iocContainer.register(PingController,new PingController())