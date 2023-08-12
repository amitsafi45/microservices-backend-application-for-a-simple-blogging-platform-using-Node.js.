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
import { User } from "@prisma/client";
import { isUUID } from "class-validator";

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

  async logout(req: Request, res: Response){
    const cookie=JSON.parse(JSON.stringify(req.cookies))
    if(!cookie.refresh){
      throw HttpException.noContent("Token not found")
    }
    res.clearCookie('refresh',{
      httpOnly:true, //accessible only by web server
      secure:true,//https
      sameSite:'none', //cross-site cookie
    

    })
    res.status(StatusCodes.SUCCESS).send(
      createResponse<object>(
        true,
        StatusCodes.SUCCESS,
        Message.logout,
       
      )
    );

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
    res.status(StatusCodes.ACCEPTED).send(
      createResponse<object>(
        true,
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
   
   await this.tokenService.blockRefreshToken(refreshTokens)
    const ONE_DAY_AFTER = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    await this.tokenService.create(refreshToken, ONE_DAY_AFTER, id);

    res.cookie('refresh',refreshToken,{
      httpOnly:true, //accessible only by web server
      secure:true,//https
      sameSite:'none', //cross-site cookie
      maxAge:7*24*60*60*1000 //cookie expiry:set to match refresh token expire time

    })
    res.status(StatusCodes.CREATED).send(
      createResponse<object>(
        true,
        StatusCodes.CREATED,
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
    const d=await this.userService.register(req.body);
    return res.status(StatusCodes.CREATED).send(
      createResponse<string>(
        true,
        StatusCodes.CREATED,
        CreatedMessage("User")
      )
    );
  }
  async get(req: Request, res: Response): Promise<void> {
    if(!isUUID(req.user.id)){
      throw HttpException.forbidden("Invalid User")
    }
    const data = await this.userService.get(req.user.id);

    res.status(StatusCodes.SUCCESS).send(
      createResponse<object>(
        true,
        StatusCodes.SUCCESS,
        FetchMessage("User"),
        data
      )
    );
  }
  async gets(req: Request, res: Response): Promise<void> {
    const users = await this.userService.gets();

    res.status(StatusCodes.SUCCESS).send(
      createResponse<object>(
        true,
        StatusCodes.SUCCESS,
        FetchMessage("List of user"),
        users
      )
    );
  }
  async deactivate(req: Request, res: Response): Promise<void> {
    const user=req.user as User
    await this.userService.delete(user.id);

    res.status(StatusCodes.SUCCESS).send(
      createResponse<string>(
        true,
        StatusCodes.SUCCESS,
        "Your Account Deactivated"
      )
    );
  }
  async update(req: Request, res: Response): Promise<void> {
    await this.userService.update(req.body);

    res.status(StatusCodes.CREATED).send(
      createResponse<string>(
        true,
        StatusCodes.CREATED,
        UpdatedMessage("User")
      )
    );

  }
  async createProfile(req: Request, res: Response){
     const data=req.body as ProfileDTO
     if(!isUUID(req.user.id)){
      throw HttpException.badRequest("Invalid User")
     }

     const user=await this.userService.get(req.user.id)
     if(user.profileStatus===true){
      throw HttpException.badRequest("You have already created profile")
     }
     let media
     let profile
     try{
        profile=await this.userService.createProfile(data,req.user.id)
        media=await this.mediaService.uploadFile(data.media,profile.id,req.user.id)
        await this.userService.updateProfileStatus(user.id,true)
        res.status(StatusCodes.CREATED).send(
          createResponse<object>(
            true,
            StatusCodes.CREATED,
            CreatedMessage("Profile")
          )
        );
     }catch(e:any){
      if(media){
        await this.mediaService.delete(media.id)

      }
      if(profile){

        await this.userService.deleProfile(profile.id)
      }
      await this.userService.updateProfileStatus(user.id,false)
       throw HttpException.conflict("Profile not created")
     }
   
  }
}
