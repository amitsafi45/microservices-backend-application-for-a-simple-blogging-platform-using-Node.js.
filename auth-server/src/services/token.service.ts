// import { Token } from "../../entities/token/token.entity";
// import { AppDataSource } from "../../configs/database.config";
// import { Admin } from "../../entities/admin/admin.entity";
// import { TokenStatus } from "../../constants/enum";
// import User from '../../entities/user/user.entity'
import { Token, TokenStatus, User } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/database.config";
import HttpException from "../utils/HttpException";
import { Message } from "../constants/message";
import { autoInjectable } from "tsyringe";
@autoInjectable()
export class TokenService {
  async create(userToken: string, expiresAt: Date, userID: string) {
    await prisma.token.create({
      data: {
        token: userToken,
        status: "UN_USED",
        expiresAt: expiresAt,
        userID: userID,
      },
    });
  }

  async blockRefreshToken(refreshToken:string){
   const findToken=await prisma.token.update({
   where:{
     token:refreshToken
   
   },
   data:{
      status:TokenStatus.USED,
      updatedAt:new Date(Date.now())
   }
   })
   if(!findToken){
    throw HttpException.badRequest(Message.unAuthorized)
   }
   return findToken
  }
  
}
