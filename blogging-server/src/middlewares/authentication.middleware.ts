import { NextFunction, Request, Response } from "express";
import { Message } from "../constants/message";
import HttpException from "../utils/HttpException";
import EnvironmentConfiguration from "../config/env.config";
import { Mode } from "../constants/enum";
import { prisma } from "../config/database.config";
import axios from "axios";
import { StatusCodes } from "../constants/statusCodes";

export default class Authentication {
  static Check = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
      // *Convert body to class instance
      try {
        const authorization = req?.headers?.authorization;
        if (!authorization) {
          return next(HttpException.notFound("Token not found"));
        }
        const data = authorization?.trim().split(" ");

        if (data?.length !== 2) {
          return HttpException.badRequest("Token not found");
        }

        let responses: any;

        responses = await axios.get(
          "http://localhost:4001/api/auth/ping/verification",
          {
            headers: {
              Authorization: req?.headers?.authorization,
            },
            withCredentials: true,
          }
        );

        req.user = responses?.data?.data;
        next();
      } catch (error: any) {
        return res.status(error?.response?.status).json({
          success: error?.response?.data?.success,
          code: error?.response?.data?.code,
          message: error?.response?.data?.message,
        });
      }
    };
  };
}
