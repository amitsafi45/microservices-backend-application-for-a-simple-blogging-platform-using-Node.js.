import { NextFunction, Request, Response } from "express";
import { Message } from "../constants/message";
import HttpException from "../utils/HttpException";
import EnvironmentConfiguration from "../config/env.config";
import { Mode } from "../constants/enum";
import { prisma } from "../config/database.config";
import axios from 'axios'
export default class Authentication {
  static Check = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
      // *Convert body to class instance
      const authorization = req?.headers.authorization;
      console.log(authorization,'lllll');
      if (!authorization) {
        
        return next(HttpException.badRequest("11"));
      }

      const data = authorization.trim().split(" ");

      if (data.length !== 2) {
       return  next( HttpException.badRequest("22"));
      }

      const mode = data[0];
      const token = data[1];
      let responses:any
      
        
         responses=axios.get('http://localhost:4001/api/auth/ping/verification',{
               headers:{
                Authorization:authorization
               }
            }).then((response)=>{
            console.log("response",response.data.code,"llllpppppppppp")
            req.user=response.data.data
            // return respons
              next()
       }).catch((error)=>{
       
         return next( HttpException.serviceUnAvailable("lll"))
       })
      

     
        // next();
      } 
      
    };
  };

