import { Application} from "express";
import express from 'express'
import compression from 'compression'
import { rateLimiter } from "../utils/rateLimiter.utils";
import cors from 'cors'
import errorHandler from "./error.middleware";
import morgan from 'morgan'
const middleware = async (app: Application) => {
    app.use(compression());
    app.use(morgan("dev"))
    app.use(rateLimiter)
    app.use(cors({ origin: "*" }));
    app.use(express.json());

    app.use(errorHandler)
}
export default middleware