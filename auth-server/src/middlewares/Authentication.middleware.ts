import { NextFunction, Request, Response } from "express";
import { Message } from "../constants/message";
import HttpException from "../utils/HttpException";
import webTokenUtils from "../utils/webToken.utils";
import EnvironmentConfiguration from "../config/env.config";
import { Mode } from "../constants/enum";
import { prisma } from "../config/database.config";
import { getNotFoundMessage } from "../utils/responseMessage.utils";

export default class Authentication {
  static Check = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
      // *Convert body to class instance
      const authorization = req?.headers.authorization;
      console.log(authorization,'lllll');
      if (!authorization) {
        
        return next(HttpException.noContent("Token not found"));
      }

      const data = authorization.trim().split(" ");

      if (data.length !== 2) {
       return  next( HttpException.badRequest("Invalid Token"));
      }

      const mode = data[0];
      const token = data[1];
      try {
        let data;
        if (mode === Mode.BEARER || mode==="Bearer") {
          data = webTokenUtils.verify(
            token,
            EnvironmentConfiguration.ACCESS_TOKEN_SECRET
          );
        } else {
        return  next( HttpException.unauthorized(Message.unAuthorized));
        }

        const { id, email } = data;
        let user;
        user = await prisma.user.findFirst({
          where: {
            id: id,
            email: email,
          },
        });
        if (!user) {
          throw HttpException.notFound(getNotFoundMessage("User"));
        }
        const { password, ...rest } = user;
        req.user = rest;
        next();
      } catch (err: any) {
        console.error(err.toString());
        
       return  next(HttpException.unauthorized(Message.unAuthorized));
      }
    };
  };
}
