// import { Token } from "../../entities/token/token.entity";
// import { AppDataSource } from "../../configs/database.config";
// import { Admin } from "../../entities/admin/admin.entity";
// import { TokenStatus } from "../../constants/enum";
// import User from '../../entities/user/user.entity'
import { Token, User } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/database.config";
 class TokenService {
 
  async create(
    userToken: string,
    expiresAt:Date,
    userID: string
  ) {

   
   await prisma.token.create({data:{
    token:userToken,
    status:"UN_USED",
    expiresAt:expiresAt,
    userID:userID
    
   }})
    
   
    
  }

//   async update(userToken: string, status: TokenStatus) {
//     return await this.tokenRepository.update(
//       { token: userToken },
//       { status: status }
//     );
//   }

//   async inactiveAllActiveTokens(admin: Admin) {
//       return await this.tokenRepository.update(
//         {
//           admin: {
//             id: admin.id,
//           },
//           status: TokenStatus.ACTIVE,
//         },
//         { status: TokenStatus.INACTIVE }
//       );
//      }

//   async isValidRefreshToken(token: string): Promise<boolean> {
//     const refreshToken = await this.tokenRepository.findOne({
//       where: {
//         token,
//       },
//     });

//     if (!refreshToken || refreshToken.status === TokenStatus.INACTIVE)
//       return false;
//     return true;
//   }
}
export default new TokenService()