import { ApiDetail } from "../dtos/gateway.dto";
import { prisma } from "../config/database.config";
import { autoInjectable } from "tsyringe";
import HttpException from "../utils/HttpException";
@autoInjectable()
export class GatewayService{
   async create(data:ApiDetail){
     await prisma.serviceRegistry.create({data:{
        ...data    }})
   }

   async gets(){
    return await prisma.serviceRegistry.findMany({
select:{
    id:true,
    clientName:true,
    serviceName:true,
    host:true,
    port:true,
    status:true
}
    })
}
   async update(data:ApiDetail){
       const client=await prisma.serviceRegistry.update({
        where:{
            serviceName:data.serviceName
        },
        data:{...data}
        
       })
       if(!client){
        throw HttpException.badRequest("Client not found")
       }

   }
}