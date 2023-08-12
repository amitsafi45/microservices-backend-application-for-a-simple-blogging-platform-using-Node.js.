import { autoInjectable } from "tsyringe";
import { PostDTO, UpdatePostDTO } from "../dtos/blog.dto";
import { prisma } from "../config/database.config";
import HttpException from "../utils/HttpException";
import { getNotFoundMessage } from "../utils/responseMessage.utils";

@autoInjectable()
export class PostService{
      async create(data:PostDTO,authorID:string){
        console.log(data,"data")
         await prisma.post.create({data:{
           title:data.title,
           content:data.content,
           authorID:authorID,
           tags:data.tags
           
         }})
      }
      async update(data:UpdatePostDTO,authorID:string){
          const updatePost=await prisma.post.update({
            where:{
                id:data.postID
            },
            data:{
            title:data.title,
           content:data.content,
           authorID:authorID,
           tags:data.tags,
           updatedAt:new Date(Date.now())
         
            }
          })
          if(!updatePost){
            throw HttpException.badRequest(getNotFoundMessage("Post"))
          }
      }

      async get(id:string){
    const post= await prisma.post.findFirst({
        where:{
            id:id
        },include:{
            media:true,
            comment:true,
            postLikes:true
        }
       })
       if(!post){
        throw HttpException.badRequest(getNotFoundMessage("Post"))
      }
      return post
      }

      async gets(){
          return await prisma.post.findMany({
            include:{
                media:true,
                comment:true,
                postLikes:true,
            }
          })
      }

      async delete(id:string){
      await prisma.post.delete({where:{id:id}})
      }
}