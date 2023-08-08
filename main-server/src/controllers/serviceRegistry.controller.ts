import { Request, Response } from "express";
import { ServiceRegistryService } from "../services/serviceRegistry.service";
import { CreatedMessage, UpdatedMessage } from "../utils/responseMessage.utils";
import { autoInjectable } from "tsyringe";
import { error } from "console";
import HttpException from "../utils/HttpException";

@autoInjectable()
export class ServiceRegistryController{
    public serviceRegistry:ServiceRegistryService;
    constructor(serviceRegistry:ServiceRegistryService){
        this.serviceRegistry=serviceRegistry
    }
       async create(req:Request,res:Response){
          await this.serviceRegistry.create(req.body).then((response)=>true).catch((error)=>{
            if(error.code==='P2002'){
                throw HttpException.conflict("You are already registered.")
            }
          })
          res.send(CreatedMessage("Client register"))
       }

       async update(req:Request,res:Response){
        await this.serviceRegistry.update(req.body)
        res.send(UpdatedMessage("Client updated"))
       }

       async updateStatus(req:Request,res:Response){
        await this.serviceRegistry.updateStatus(req.body)
        res.send(UpdatedMessage("Client status updated"))
        
       }
}