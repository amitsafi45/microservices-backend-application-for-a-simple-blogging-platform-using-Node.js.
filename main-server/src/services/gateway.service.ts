import { ApiDetail } from "../dtos/gateway.dto";
import { iocContainer } from "../utils/IoCContainer.utils";
import { prisma } from "../config/database.config";
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
    host:true,
    port:true,
    url:true
}
    })
   }
}
iocContainer.register(GatewayService,new GatewayService())