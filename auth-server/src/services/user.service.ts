import { RegisterDTO, UpdateRegisterDTO } from "../dtos/user.dto";
import { IUser, IUserService } from "../interfaces/user.interface";
import { prisma } from "../config/database.config";
import { User } from "@prisma/client";
import HttpException from "../utils/HttpException";
import {
  deletedMessage,
  getNotFoundMessage,
} from "../utils/responseMessage.utils";
export class UserService implements IUserService {
  async register(data: RegisterDTO): Promise<void> {
    await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
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
        // createdAt:true
      },
    });
    return data;
  }
  async get(id: string): Promise<IUser> {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: id,
      },
      select: {
        email: true,
        username: true,
        id: true,
      },
    });
    if (!user) {
      throw HttpException.notFound(getNotFoundMessage("User"));
    }
    return user;
  }
  async delete(id: string): Promise<string> {
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });

    return deletedMessage("User");
  }
  async update(data: UpdateRegisterDTO): Promise<void> {
    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username,
        email: data.email,
      },
    });
    if (!user) {
      throw HttpException.notFound(getNotFoundMessage("User"));
    }
  }
}