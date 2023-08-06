import { Request, Response } from "express";
import { RegisterDTO, UpdateRegisterDTO } from "../dtos/user.dto";
import { User } from "@prisma/client";
export interface IUser{
   id:string,
   username:string,
   email:string


}
export interface IUserController {
  register(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
  gets(req: Request, res: Response): void;
  update(req: Request, res: Response):void;
}
export interface IUserService {
  register(data: RegisterDTO): void;
   gets(page: number, perPage: number, search?: string):Promise<IUser[]>;
  get(id:string):Promise<IUser>
  delete(id:string):Promise<string>
  update(data:UpdateRegisterDTO):void
}