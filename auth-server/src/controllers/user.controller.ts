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
} from "../utils/responseMessage.utils";
import tokenService from "../services/token.service";
import webToken from "../utils/webToken.utils";
import { Message } from "../constants/message";
import HttpException from "../utils/HttpException";
import EnvironmentConfiguration from "../config/env.config";
import { decode } from "jsonwebtoken";
class UserController implements IUserController {
  private userService: UserService;
  constructor(userServices: UserService) {
    this.userService = userServices;
  }

  async login(req: Request, res: Response): Promise<void> {
    const verifyUser = await this.userService.userVerify(req.body);
    
    const { accessToken, refreshToken } = webToken.generateTokens(
      verifyUser,
      verifyUser.email
    );
    const ONE_DAY_AFTER = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    await tokenService.create(refreshToken, ONE_DAY_AFTER, verifyUser.id);
    res.cookie('jwt',refreshToken,{
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
    // console.log(req.cookies,'gggg');
    const cookie=req.cookies
    if(!cookie.jwt){
      console.log("first");
      throw HttpException.forbidden(Message.unAuthorized)
    }
    console.log("pass");
    const refreshTokens=cookie.jwt
   const checking=webToken.verify(refreshTokens,EnvironmentConfiguration.REFRESH_TOKEN_SECRET)
    if(!checking){
      throw HttpException.forbidden("Forbidden")
    }
    const decodedValue=JSON.parse(atob(refreshTokens))
    const {id,email,username,...rest}=await this.userService.get(decodedValue.id)
    const { accessToken, refreshToken } = webToken.generateTokens(
      {id,email},
      email
    );
    const ONE_DAY_AFTER = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    await tokenService.create(refreshToken, ONE_DAY_AFTER, id);
    res.cookie('jwt',refreshToken,{
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


  async register(req: Request, res: Response): Promise<void> {
    await this.userService.register(req.body);

    res.send(
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
}
const userService = UserService.getInstance();
export default new UserController(userService);
