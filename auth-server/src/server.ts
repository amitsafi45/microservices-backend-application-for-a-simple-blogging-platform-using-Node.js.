import express, { Request, Response } from 'express'
import 'reflect-metadata';
import middleware from './middlewares';
import EnvironmentConfiguration from './config/env.config';
import axios from 'axios';
import { error } from 'console';

//   console.log('an event occurred!');
// });
// myEmitter.emit('event');
const app = express();
async function bootStrap() {

  await middleware(app);
  app.listen(EnvironmentConfiguration.PORT ||3000, async () => {
   
      console.info(
        `Auth Server started at http://localhost:${EnvironmentConfiguration.PORT}`
      );
      // const registerService=async()=> await axios.post('http://localhost:4000/service-registry/api/register',{
      //   "clientName":"amit auth supplier",
      //   "host":"localhost",
      //   "port":EnvironmentConfiguration.PORT,
      //   "status":"LIVE",
      //   "serviceName":"auth"        
      // })
      // await registerService()
      // console.log("dddd");









      //  const interval=setInterval(registerService,20*1000);
      //  const cleanUp=async()=>{
      //    clearInterval(interval);
      //  }

    //   const register=()=>console.log("first heelll")

    //   const pingMainServer= ()=>{
    //    axios.get('http://localhost:4000/metro/api/ping').then((response)=>{
    //         console.log("response",response.data)
              
    //    }).catch((error)=>{
    //     // console.log("dddd")
    //       console.log(error.message)
    //    })
    // }

    // setInterval(pingMainServer,5000)
//      myEmitter.on('ping main server', async() => {
//       try{
//         const registerService= await axios.get('http://localhost:4000/service-registry/api/ping')    
//           console.log(registerService.data);
//       }catch(e:any){
//         console.log(e.message);
//       }
//     });
//       myEmitter.emit('ping main server');
//   });
  // const registerService=async()=> await axios.post('http://localhost:4000/service-registry/api/register',{
  //     "clientName":"amit auth supplier",
  //     "host":"localhost",
  //     "port":EnvironmentConfiguration.PORT,
  //     "status":"LIVE",
  //     "serviceName":"auth"        
  //   })
  //   registerService().then((response)=>console.log(response.data,"ggg")).catch((error)=>console.log(error,"fff"))
  //  console.log("dddd");
//   // app.on('listen',async()=>{
//   //   console.log("object");
//   //     const registerService=async()=> await axios.post('http://localhost:4000/service-registry/api/register',{
//   //       "clientName":"amit auth supplier",
//   //       "host":"localhost",
//   //       "port":EnvironmentConfiguration.PORT,
//   //       "status":"LIVE",
//   //       "serviceName":"auth"        
//   //     })
//   //    await registerService()
//   //    console.log("dddd");
//   //     const interval=setInterval(registerService,20*1000);
//       // const cleanUp=async()=>{
//       //   clearInterval(interval);
//       //   await 
//       // }


 })

 }
 





 

























try {
   bootStrap();

} catch (error) {
  console.log(error);
  process.exit(1);
}

    
    // const interval=setInterval(registerService,20*1000)