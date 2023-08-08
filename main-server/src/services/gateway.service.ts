import { ApiDetail } from "../dtos/gateway.dto";
import { prisma } from "../config/database.config";
import { autoInjectable } from "tsyringe";
@autoInjectable()
export class GatewayService{
   async create(data:ApiDetail){
     await prisma.serviceRegistry.create({data:{
        ...data    }})
   }

   async gets(){
    console.log("service")
    const t= await prisma.serviceRegistry.findMany({
select:{
    id:true,
    clientName:true,
    serviceName:true,
    host:true,
    port:true,
}
    })
    console.log(t,"service")
return t   
}
   
}