import { Application} from "express";
import express from 'express'
import compression from 'compression'
import { rateLimiter } from "../utils/rateLimiter.utils";
import cors from 'cors'
import errorHandler from "./error.middleware";
import clientRoutes from '../routes/gateway.routes'
import serviceRegistryRoutes from '../routes/serviceRegistry.routes'
import morgan from 'morgan'
const middleware = async (app: Application) => {
    app.use(compression());
    app.use(morgan("dev"))
    app.use(rateLimiter)
    app.use(cors({ origin: "*",credentials:true }));

    app.use(express.json());
    app.use('/service-registry/api',serviceRegistryRoutes)
     app.use('/service/api',clientRoutes)
    app.use(errorHandler)
}
export default middleware