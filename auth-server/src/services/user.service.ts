import { RegisterDTO } from "../dtos/user.dto";
import { IUserService } from "../interfaces/user.interface";
import { prisma } from "../config/database.config";
export class UserService implements IUserService{
   async register(data: RegisterDTO): Promise<void> {
        await prisma.user.create({data:{
            username:data.username,
            email:data.email,
            password:data.password
        }})
    }
}