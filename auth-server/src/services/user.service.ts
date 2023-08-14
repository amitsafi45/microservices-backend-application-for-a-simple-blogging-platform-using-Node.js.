import {
  LoginDTO,
  ProfileDTO,
  RegisterDTO,
  UpdateRegisterDTO,
} from "../dtos/user.dto";
import { IUser, IUserService } from "../interfaces/user.interface";
import { prisma } from "../config/database.config";
import { PrismaClient, Profile, User } from "@prisma/client";
import HttpException from "../utils/HttpException";
import {
  deletedMessage,
  getNotFoundMessage,
} from "../utils/responseMessage.utils";
import BcryptService from "../utils/bcrypt.utils";
import { Message } from "../constants/message";
import { autoInjectable } from "tsyringe";
import { ConnectorType } from "@prisma/client/runtime/library";
@autoInjectable()
export class UserService {
  async register(data: RegisterDTO): Promise<void> {

    await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: await BcryptService.hash(data.password),
        profileStatus: false,
      },
    });
  }

  async gets(
    page?: number,
    perPage?: number,
    search?: string
  ): Promise<IUser[]> {
    const data = await prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        email: true,
        username: true,
        profileStatus: true,
        // createdAt:true
      },
    });
    return data;
  }
  
  async get(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },

      include: {
        profile: {
          include: {
            media: true,
          },
        }
      },
    });
    if (!user) {
      throw HttpException.notFound(getNotFoundMessage("User"));
    }
    const { password, ...rest } = user;
    return rest;
  }
  async delete(id: string) {
    await prisma.user.delete({
      where: { id: id },
    });
  }
  async updateProfileStatus(
    id: string,
    status: boolean,
    connection: any
  ): Promise<void> {
    const user = await connection.user.update({
      where: {
        id: id,
      },
      data: {
        profileStatus: status,
      },
    });
    if (!user) {
      throw HttpException.notFound(getNotFoundMessage("User"));
    }
  }

  async userVerify(data: LoginDTO): Promise<IUser> {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw HttpException.badRequest(Message.emailOrPassword);
    }
    const verify = await BcryptService.compare(data.password, user.password);
    if (!verify) {
      throw HttpException.badRequest(Message.emailOrPassword);
    }
    return user;
  }

  async createProfile(
    profileData: ProfileDTO,
    userID: string,
    connection: any
  ) {
    return await connection.profile.create({
      data: {
        address: profileData.address,
        bio: profileData.bio,
        socialMediaLink: profileData.socialMediaLink,
        userID: userID,
      },
    });
  }
  async updateProfile(
    profileData: ProfileDTO,
    userID: string,
    connection: any
  ) {
    const p = await connection.profile.update({
      where: {
        userID: userID,
      },
      data: {
        address: profileData.address,
        bio: profileData.bio,
        socialMediaLink: profileData.socialMediaLink,
      },
      include: {
        media: true,
      },
    });

    return p;
  }

  async deleProfile(id: string) {
    await prisma.profile.delete({
      where: {
        id: id,
      },
    });
  }
  async getUserByEmail(email:string){
    const user = await prisma.user.findFirst({
      where: {
        email:email,
      },
    });
    return user
  }
}
