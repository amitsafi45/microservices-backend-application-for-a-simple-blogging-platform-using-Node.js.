import { Request, Response } from "express";
import { ReturnResponse, createResponse } from "../utils/response";
import { StatusCodes } from "../constants/statusCodes";
import { autoInjectable } from "tsyringe";
@autoInjectable()
export class PingController {
  ping(req: Request, res: Response):void {
    const response = createResponse<string>(  true,
    StatusCodes.SUCCESS,
    "Pong");
    
    res.status(StatusCodes.SUCCESS).send(response);
  }
}