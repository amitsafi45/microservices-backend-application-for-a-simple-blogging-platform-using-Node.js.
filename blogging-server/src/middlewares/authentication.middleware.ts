import { NextFunction, Request, Response } from "express";
import { Message } from "../constants/message";
import HttpException from "../utils/HttpException";
import EnvironmentConfiguration from "../config/env.config";
import { Mode } from "../constants/enum";
import { prisma } from "../config/database.config";
import axios from "axios";
export default class Authentication {
  static Check = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
      // *Convert body to class instance
      const authorization = req?.headers.authorization;
      console.log(authorization,"in blog server")
      if (!authorization) {
         throw HttpException.noContent("Token not found");
      }

      const data = authorization.trim().split(" ");

      if (data.length !== 2) {
        throw HttpException.noContent("Token not found");
      }

      const mode = data[0];
      const token = data[1];
      let responses: any;

      responses = axios
        .get("http://localhost:4001/api/auth/ping/verification", {
          headers: {
            Authorization: authorization,
          },
          withCredentials:true
        })
        .then((response) => {
          req.user = response.data.data;
          next();
        })
        .catch((error) => {
          return res.status(error.response.status).json({
            success: error.response.data.success,
            code: error.response.data.code,
            message: error.response.data.message,
          });
        });
    };
  };
}
