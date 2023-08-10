import { Request, Response } from "express";
import { StatusCodes } from "../constants/statusCodes";
import { IUser, IUserController } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
import { ReturnResponse, createResponse } from "../utils/response";
import {
  CreatedMessage,
  FetchMessage,
  UpdatedMessage,
  deletedMessage,
  getNotFoundMessage,
} from "../utils/responseMessage.utils";
import webToken from "../utils/webToken.utils";
import { Message } from "../constants/message";
import HttpException from "../utils/HttpException";
import EnvironmentConfiguration from "../config/env.config";
import { decode } from "jsonwebtoken";
import { TokenService } from "../services/token.service";
import { ProfileDTO } from "../dtos/user.dto";
import { MediaService } from "../services/media.service";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class UserController implements IUserController {
  public userService:UserService
  public tokenService:TokenService;
  public mediaService: MediaService;
  
  constructor(userService:UserService,tokenService:TokenService,mediaService:MediaService) {
    this.userService = userService
    this.tokenService=tokenService
    this.mediaService=mediaService // Use the IOC container
  }

  async login(req: Request, res: Response): Promise<void> {
    const verifyUser = await this.userService.userVerify(req.body);
    
    const { accessToken, refreshToken } = webToken.generateTokens(
      verifyUser,
      verifyUser.email
    );
    const ONE_DAY_AFTER = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    await this.tokenService.create(refreshToken, ONE_DAY_AFTER, verifyUser.id);
    res.cookie('refresh',refreshToken,{
      httpOnly:true, //accessible only by web server
      secure:true,//https
      sameSite:'none', //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry:set to match refresh token expire time

    })
    res.send(
      createResponse<object>(
        "success",
        StatusCodes.ACCEPTED,
        Message.loginSuccessfully,
        {
          token: accessToken,
          email: verifyUser.email,
          username: verifyUser.username,
        }
      )
    );
  }


  async refresh(req: Request, res: Response):Promise<void>{
    const cookie=JSON.parse(JSON.stringify(req.cookies))
    if(!cookie.refresh){
      throw HttpException.forbidden(Message.unAuthorized)
    }
    const refreshTokens=cookie.refresh  
   const checking=webToken.verify(refreshTokens.toString(),EnvironmentConfiguration.REFRESH_TOKEN_SECRET)
    if(!checking){
      throw HttpException.forbidden("Forbidden")
    }
    const {id,email,username,...rest}=await this.userService.get(checking.id)
    const { accessToken, refreshToken } = webToken.generateTokens(
      {id,email},
      email
    );

    const ONE_DAY_AFTER = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    await this.tokenService.create(refreshToken, ONE_DAY_AFTER, id);

    // await  this.tokenService.refreshTokenRotation(refreshToken, ONE_DAY_AFTER, id);
    res.cookie('refresh',refreshToken,{
      httpOnly:true, //accessible only by web server
      secure:true,//https
      sameSite:'none', //cross-site cookie
      maxAge:7*24*60*60*1000 //cookie expiry:set to match refresh token expire time

    })
    res.send(
      createResponse<object>(
        "success",
        StatusCodes.ACCEPTED,
        Message.userRefresh,
        {
          token: accessToken,
          email: email,
          username:username,
        }
      )
    );

  }


  async register(req: Request, res: Response) {
    console.log("first")
    const d=await this.userService.register(req.body);
    return res.send(
      createResponse<string>(
        "success",
        StatusCodes.SUCCESS,
        CreatedMessage("User")
      )
    );
  }
  async get(req: Request, res: Response): Promise<void> {
    const data = await this.userService.get(req.params.userID);

    res.send(
      createResponse<IUser>(
        "success",
        StatusCodes.SUCCESS,
        FetchMessage("User"),
        data
      )
    );
  }
  async gets(req: Request, res: Response): Promise<void> {
    const users = await this.userService.gets();

    res.send(
      createResponse<IUser>(
        "success",
        StatusCodes.SUCCESS,
        FetchMessage("List of user"),
        undefined,
        users
      )
    );
  }
  async delete(req: Request, res: Response): Promise<void> {
    await this.userService.delete(req.params.userID);

    res.send(
      createResponse<string>(
        "success",
        StatusCodes.SUCCESS,
        deletedMessage("User")
      )
    );
  }
  async update(req: Request, res: Response): Promise<void> {
    await this.userService.update(req.body);

    res.send(
      createResponse<string>(
        "success",
        StatusCodes.SUCCESS,
        UpdatedMessage("User")
      )
    );

  }
  async createProfile(req: Request, res: Response){
     const data=req.body as ProfileDTO
     const user=await this.userService.get(data.userID)
     if(user.profileStatus===true){
      throw HttpException.badRequest("You have already created profile")
     }
     const profile=await this.userService.createProfile(data)
     try{
       await this.mediaService.uploadFile(data.media,profile.id)
     }catch(e:any){
      console.log(e.message)
       await this.userService.deleProfile(profile.id)
     }
     res.send(
      createResponse<string>(
        "success",
        StatusCodes.SUCCESS,
        CreatedMessage("Profile")
      )
    );
  }
}
