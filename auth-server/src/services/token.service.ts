// import { Token } from "../../entities/token/token.entity";
// import { AppDataSource } from "../../configs/database.config";
// import { Admin } from "../../entities/admin/admin.entity";
// import { TokenStatus } from "../../constants/enum";
// import User from '../../entities/user/user.entity'
import { Token, User } from "@prisma/client";
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

  async refreshToken(id:string,refreshToken:string){
   const findToken=await prisma.token.findFirst({
   where:{
    userID:id,
    token:refreshToken,
    status:"UN_USED"
   },
   include:{
     user:true
   }
   })
   if(!findToken){
    throw HttpException.badRequest(Message.unAuthorized)
   }
   return findToken
  }
  async refreshTokenRotation(currentRefreshToken:string,expiredAt:Date,id:string){
    const findToken=await prisma.token.update({
    where:{
    userID:id,
     status:"UN_USED"
    },
    include:{
      user:true
    },
    data:{token:currentRefreshToken,expiresAt:expiredAt}
    })
    if(!findToken){
     throw HttpException.badRequest(Message.unAuthorized)
    }
    return true
   }
}
