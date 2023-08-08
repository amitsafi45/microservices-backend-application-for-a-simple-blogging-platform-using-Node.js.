import { Request, Response } from "express";
import { iocContainer } from "../utils/IoCContainer.utils";
import { GatewayService } from "../services/gateway.service";
import { CreatedMessage } from "../utils/responseMessage.utils";

export class GatewayController{
    public gatewayService:GatewayService;
    constructor(){
        this.gatewayService=iocContainer.resolve(GatewayService)
    }
       async create(req:Request,res:Response){
          await this.gatewayService.create(req.body)
          res.send(CreatedMessage("Client register"))
       }
}
iocContainer.register(GatewayController,new GatewayController())