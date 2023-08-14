import express, { Request, Response, response } from "express";
import "reflect-metadata";
import middleware from "./middlewares";
import EnvironmentConfiguration from "./config/env.config";
import axios from "axios";
import { error } from "console";

const app = express();
async function bootStrap() {
  await middleware(app);
  app.listen(EnvironmentConfiguration.PORT || 3000, async () => {
    console.info(
      `Blogging Server started at http://localhost:${EnvironmentConfiguration.PORT}`
    );
    const registerService = async () =>
      await axios.post("http://localhost:4003/service-registry/api/register", {
        clientName: "BLogging Section",
        host: "localhost",
        port: EnvironmentConfiguration.PORT,
        status: "LIVE",
        serviceName: "auth",
      });
    const updateService = async (status: string) =>
      await axios.patch("http://localhost:4003/service-registry/api/update", {
        clientName: "Blogging Section",
        host: "localhost",
        port: EnvironmentConfiguration.PORT,
        status:"DIE",
        serviceName: "auth",
      });
    registerService()
      .then( (response) => {
        console.log("Blogging Service register detail in Main server")
      })
      .catch(async (error) => {
        if (error.response.status===409) {
          await updateService("LIVE");
          console.log("Blogging Service Updated detail in Main server")
        }
      });
    // registerService()
      // .then(async (response) => {
      //   console.log(response.data);
      // })
      // .catch(async (error) => {
      //   if (error.response.status === 409) {
      //     await updateService("LIVE");
      //   }
      });

  //   const interval = setInterval(updateService, 5*60*1000);
  //   const cleanUp = async () => {
  //     clearInterval(interval);
  //     await updateService("DIE");
  //   }
  //   process.on("uncaughtException",async()=>{
  //     await cleanUp();
  //     process.exit()
  //         })
  //   process.on('SIGINT',async()=>{
  //     await cleanUp()
  //     process.exit()
  //   })
  //  process.on('SIGTERM',async()=>{
  //   await cleanUp()
  //   process.exit()
  //  })
  //});
}

try {
  bootStrap();
} catch (error) {
  console.log(error);
  process.exit(1);
}