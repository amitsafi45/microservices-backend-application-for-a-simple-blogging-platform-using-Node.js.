import { Request, Response, Router, response } from "express";
import { GatewayService } from "../services/gateway.service";
import axios from "axios";
import { container } from "tsyringe";
import HttpException from "../utils/HttpException";
const router =Router()
const client=async()=>{
  return await container.resolve(GatewayService).gets()
// console.log(data,"dta")
// return data
}
router.all(
  '/:serviceName/:target',async(req:Request,res:Response)=>{
    console.log(req.params.target)
    const clientDetail=await client()
    console.log("ooooooo")
   clientDetail.map((endPoint)=>{
    
        let response
        console.log("111111111")
        if(endPoint.serviceName===req.params.serviceName){
          let url
          if(req.query.action){
             url=`http://${endPoint.host}:${endPoint.port}/api/${endPoint.serviceName}/${req.params.target}/${req.query.action}`

          }else{
            url=`http://${endPoint.host}:${endPoint.port}/api/${endPoint.serviceName}/${req.params.target}`
            
          }
console.log(url,'////////')
          console.log(`http://${endPoint.host}:${endPoint.port}/api/${endPoint.serviceName}/${req.params.target}/${req.query.action}`)
          console.log(req.method,"oooooo")
          axios({
            method:req.method,
            headers:req.headers,
            data:req.body,
            url:url

          }).then((response)=>{
            console.log(response.data,"kkkk")
             res.send(response.data)
          }).catch((error)=>{
             res.status(500).send("Something went wrong with client")
          })
          console.log("pppppppp")
        }else{
          throw HttpException.notFound("Service not found")
        }
      
    })
    
    
    //@ts-ignore

// await      client().map((endPoint)=>{
//           console.log("first")
//             try{
//                 axios({
//                     method:req.method,
//                     headers:req.headers,
//                     data:req.body,
//                     url:`${endPoint.url}/+${req.params.nextPoint}`
        
//                   })
        //     }
        //   catch(e:any){
        //     console.log(e.message)
        //     res.send("Something wrong in main-server")
        //   }
        // })
    }
)

export default router