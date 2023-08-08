import { Request, Response } from "express";
import { GatewayService } from "../services/gateway.service";
import { CreatedMessage } from "../utils/responseMessage.utils";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class GatewayController{
    public gatewayService:GatewayService;
    constructor(gatewayService:GatewayService){
        this.gatewayService=gatewayService
    }
       async create(req:Request,res:Response){
          await this.gatewayService.create(req.body)
          res.send(CreatedMessage("Client register"))
       }
}