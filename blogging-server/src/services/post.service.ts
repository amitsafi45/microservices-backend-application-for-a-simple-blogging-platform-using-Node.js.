import { autoInjectable } from "tsyringe";
import { PostDTO, UpdatePostDTO } from "../dtos/blog.dto";
import { prisma } from "../config/database.config";
import HttpException from "../utils/HttpException";
import { getNotFoundMessage } from "../utils/responseMessage.utils";
import { skip } from "node:test";

@autoInjectable()
export class PostService{
      async create(data:PostDTO,authorID:string){
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

      async gets(page:number,perPage:number){
        const skipCount = (page - 1) * perPage;
          const data= await prisma.post.findMany({
            include:{
                media:false ,
                comment:true,
                postLikes:true,
            },
            skip:skipCount,
            take:perPage
          })
        const dataCount=await prisma.post.count()
        return{list:data,count:dataCount}
      }

      async delete(id:string){
      await prisma.post.delete({where:{id:id}})
      }


      async myPost(userID:string){
     return await prisma.post.findMany({where:{
      authorID:userID
     },include:{
      comment:{
        include:{
          commentLikes:true
        }
      },
      postLikes:true
     }})
      }
}