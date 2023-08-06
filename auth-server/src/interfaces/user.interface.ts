import { Request, Response } from "express";
import { RegisterDTO } from "../dtos/user.dto";

export interface IUserController{
   register(req:Request,res:Response):void
}
export interface IUserService{
    register(data:RegisterDTO):void
}