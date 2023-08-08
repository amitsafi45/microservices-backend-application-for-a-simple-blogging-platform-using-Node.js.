import { Request, Response, Router } from "express";
import { iocContainer } from "../utils/IoCContainer.utils";
import { GatewayService } from "../services/gateway.service";
import axios from "axios";
const router =Router()
const api= iocContainer.resolve(GatewayService).gets()
router.all(
    '/:nextPoint',async(req:Request,res:Response)=>{
        (await api).map((endPoint)=>{
            try{
                axios({
                    method:req.method,
                    headers:req.headers,
                    data:req.body,
                    url:`${endPoint.url}+${req.params.nextPoint}`
        
                  })
            }
          catch(e:any){
            console.log(e.message)
            res.send("Something wrong in main-server")
          }
        })
    }
)

export default router