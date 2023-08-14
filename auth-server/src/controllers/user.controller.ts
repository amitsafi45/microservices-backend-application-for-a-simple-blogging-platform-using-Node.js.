import { NextFunction, Request, Response } from "express";
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
import { ProfileDTO, UpdateProfileDTO } from "../dtos/user.dto";
import { MediaService } from "../services/media.service";
import { autoInjectable } from "tsyringe";
import { Prisma, User } from "@prisma/client";
import { isUUID } from "class-validator";
import { TransferImage } from "../utils/transferImageFromTempTOUploadFolder.utils";
import { prisma } from "../config/database.config";

@autoInjectable()
export class UserController {
  public userService: UserService;
  public tokenService: TokenService;
  public mediaService: MediaService;

  constructor(
    userService: UserService,
    tokenService: TokenService,
    mediaService: MediaService
  ) {
    this.userService = userService;
    this.tokenService = tokenService;
    this.mediaService = mediaService; // Use the IOC container
  }

  async logout(req: Request, res: Response,next:NextFunction) {
    const cookie = JSON.parse(JSON.stringify(req.cookies));
    console.log(cookie)
    if (!cookie.refresh) {
     return  res.status(StatusCodes.NOT_FOUND).send(
        createResponse<object>(
          true,
          StatusCodes.NOT_FOUND,
          "Refresh Token Not Found",
          
        )
      );
    }
    res.clearCookie("refresh", {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
    });
  return  res
      .status(StatusCodes.SUCCESS)
      .json(createResponse<object>(true, StatusCodes.SUCCESS, Message.logout));
  }

  async login(req: Request, res: Response): Promise<void> {
    const verifyUser = await this.userService.userVerify(req.body);

    const { accessToken, refreshToken } = webToken.generateTokens(
      verifyUser,
      verifyUser.email
    );
    const ONE_DAY_AFTER = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    await this.tokenService.create(refreshToken, ONE_DAY_AFTER, verifyUser.id);
    res.cookie("refresh", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry:set to match refresh token expire time
    });
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

  async refresh(req: Request, res: Response): Promise<void> {
    console.log(req.headers, "gerasse");
    //@ts-ignore
    console.log(JSON.parse(req.headers.cookie), "cookies");
    const cookie = JSON.parse(req.headers.cookie!);

    if (!cookie.refresh) {
      throw HttpException.forbidden(Message.unAuthorized);
    }
    const refreshTokens = cookie.refresh;
    const checking = webToken.verify(
      refreshTokens,
      EnvironmentConfiguration.REFRESH_TOKEN_SECRET
    );
    if (!checking) {
      throw HttpException.forbidden("Forbidden");
    }
    const { id, email, username, ...rest } = await this.userService.get(
      checking.id
    );
    const { accessToken, refreshToken } = webToken.generateTokens(
      { id, email },
      email
    );

    await this.tokenService.blockRefreshToken(refreshTokens);
    const ONE_DAY_AFTER = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    await this.tokenService.create(refreshToken, ONE_DAY_AFTER, id);

    res.cookie("refresh", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry:set to match refresh token expire time
    });
    res.status(StatusCodes.CREATED).send(
      createResponse<object>(true, StatusCodes.CREATED, Message.userRefresh, {
        token: accessToken,
        email: email,
        username: username,
      })
    );
  }

  async register(req: Request, res: Response) {
    const isEmailExistUser=await this.userService.getUserByEmail(req.body.email)
    if(isEmailExistUser){
     throw HttpException.conflict("Invalid Email or Password")
    }
   await this.userService.register(req.body);
    return res
      .status(StatusCodes.CREATED)
      .send(
        createResponse<string>(
          true,
          StatusCodes.CREATED,
          CreatedMessage("User")
        )
      );
  }
  async get(req: Request, res: Response): Promise<void> {
    if (!isUUID(req.user.id)) {
      throw HttpException.forbidden("Invalid User");
    }

    const data = await this.userService.get(req.user.id);
    const result = {};
    //  const path={path:`http://localhost:4001/${data.id}/${data.profile?.media?.type}/${data.profile?.media?.name}`}

    res
      .status(StatusCodes.SUCCESS)
      .send(
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

    res
      .status(StatusCodes.SUCCESS)
      .send(
        createResponse<object>(
          true,
          StatusCodes.SUCCESS,
          FetchMessage("List of user"),
          users
        )
      );
  }
  async deactivate(req: Request, res: Response): Promise<void> {
    const user = req.user as User;
    await this.userService.delete(user.id);

    res
      .status(StatusCodes.SUCCESS)
      .send(
        createResponse<string>(
          true,
          StatusCodes.SUCCESS,
          "Your Account Deactivated"
        )
      );
  }
  async updateProfile(req: Request, res: Response): Promise<void> {
    const data = req.body as UpdateProfileDTO;
    const user = req.user as User;

    if (user.profileStatus !== true) {
      throw HttpException.badRequest("Profile not found");
    }
    let media: any;
    let profile;

    await prisma.$transaction(async (connection) => {
      console.log(req.user.id, "loplop");
      profile = await this.userService.updateProfile(
        data,
        req.user.id,
        connection
      );
      console.log(profile, "profilr");
      console.log(profile?.media?.length, "ppp");
      if (profile?.media?.length > 0 && data.media) {
        media = await this.mediaService.updateMedia(
          data.media,
          profile.id,
          req.user.id,
          connection
        );
        console.log("pakkkkk");
        const instance = TransferImage.getInstance();
        instance.setInfo(req.user.id, media.type, media.name);
        instance.tempTOUploadFolder();
      }
      if (!profile?.media && data.media) {
        media = await this.mediaService.uploadFile(
          data.media,
          profile.id,
          req.user.id,
          connection
        );
        const instance = TransferImage.getInstance();
        instance.setInfo(req.user.id, media.type, media.name);
        instance.tempTOUploadFolder();
      }
    });
    await prisma.$disconnect();
    res
      .status(StatusCodes.SUCCESS)
      .send(
        createResponse<object>(
          true,
          StatusCodes.SUCCESS,
          UpdatedMessage("Profile")
        )
      );
  }
  async createProfile(req: Request, res: Response) {
    const data = req.body as ProfileDTO;
    if (!isUUID(req.user.id)) {
      throw HttpException.badRequest("Invalid User");
    }

    const user = await this.userService.get(req.user.id);
    if (user.profileStatus === true) {
      throw HttpException.badRequest("You have already created profile");
    }

    let media;
    let profile;

    await prisma.$transaction(async (connection) => {
      profile = await this.userService.createProfile(
        data,
        req.user.id,
        connection
      );
      if (data.media) {
        media = await this.mediaService.uploadFile(
          data.media,
          profile.id,
          req.user.id,
          connection
        );
        const instance = TransferImage.getInstance();
        instance.setInfo(req.user.id, media.type, media.name);
        instance.tempTOUploadFolder();
      }

      await this.userService.updateProfileStatus(req.user.id, true, connection);
    });
    await prisma.$disconnect();
    return res
      .status(StatusCodes.CREATED)
      .send(
        createResponse<object>(
          true,
          StatusCodes.CREATED,
          CreatedMessage("Profile")
        )
      );
  }
}
