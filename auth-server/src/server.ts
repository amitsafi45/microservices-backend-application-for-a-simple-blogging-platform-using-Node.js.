import express, { Request, Response, response } from "express";
import "reflect-metadata";
import middleware from "./middlewares";
import EnvironmentConfiguration from "./config/env.config";
import axios from "axios";
import { error } from "console";
import { config } from "dotenv";

const app = express();
async function bootStrap() {
  let serviceRegistry: Function;
  await middleware(app);
  app.listen(EnvironmentConfiguration.PORT || 3000, async () => {
    console.info(
      `Authentication Server started at http://localhost:${EnvironmentConfiguration.PORT}`
    );
    const registerService = async () =>
      await axios.post("http://localhost:4000/service-registry/api/register", {
        clientName: "Authentication Section",
        host: "localhost",
        port: EnvironmentConfiguration.PORT,
        status: "LIVE",
        serviceName: "auth",
      });
    const updateService = async (status: string) =>
      await axios.patch("http://localhost:4000/service-registry/api/update", {
        clientName: "Authentication Section",
        host: "localhost",
        port: EnvironmentConfiguration.PORT,
        status: status,
        serviceName: "auth",
      });
    serviceRegistry = async () =>
      registerService()
        .then((response) => {
          console.log("Authentication Service register detail in Main server");
        })
        .catch(async (error) => {
          if (error.response.status === 409) {
            await updateService("LIVE");
            console.log("Authentication Service Updated detail in Main server");
          }
        });
  });
  const guard = async () =>
    axios.get("http://localhost:4000/service-registry/api/ping");
  const task = async () =>
    await guard()
      .then(async (response) => {
        await serviceRegistry();
      })
      .catch((error) => {
        console.info(
          "Main server Not Reachable,Plz verify main server location"
        );
      });

  const interval = 20 * 60 * 1000;
  setInterval(task, interval);
}

try {
  bootStrap();
} catch (error) {
  console.log(error);
  process.exit(1);
}