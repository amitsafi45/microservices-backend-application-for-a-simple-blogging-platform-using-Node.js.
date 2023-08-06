import { Request, Response } from "express";
import { ReturnResponse } from "../utils/response";
import { StatusCodes } from "../constants/statusCodes";
import { IResponse } from "../interfaces/response.interface";

class PingController{
    ping(req:Request,res:Response):ReturnResponse{
    const response= new ReturnResponse("success",StatusCodes.SUCCESS,"Pong")
     res.send(response) 
     return response
    }
}
export default new PingController()