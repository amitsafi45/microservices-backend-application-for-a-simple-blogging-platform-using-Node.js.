import { Request, Response } from "express";
import { ReturnResponse } from "../utils/response";
import { StatusCodes } from "../constants/statusCodes";

class PingController {
  ping(req: Request, res: Response):void {
    const response =  ReturnResponse.getInstance(
      "success",
      StatusCodes.SUCCESS,
      "Pong"
    );
    res.send(response);
  }
}
export default new PingController();
