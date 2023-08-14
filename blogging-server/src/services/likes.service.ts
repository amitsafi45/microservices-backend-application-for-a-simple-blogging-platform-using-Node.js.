import { autoInjectable } from "tsyringe";
import { CommentDTO, PostLikeDTO,  } from "../dtos/blog.dto";
import { prisma } from "../config/database.config";
import HttpException from "../utils/HttpException";

@autoInjectable()
export class LikesService{
    async postLike(data:PostLikeDTO,userID:string){
       await prisma.postLike.create({data:{postID:data.postID,userID:userID}})
    }


    async postUnLike(data:PostLikeDTO,userID:string){
        const existingLike=await prisma.postLike.findFirst({where:{postID:data.postID,userID:userID}})
         if(!existingLike){
            throw HttpException.notFound("Post not Like")
         }
        await prisma.postLike.delete({where:{id:existingLike.id}})
    }


    async commentLike(commentID:string,userID:string){
        await prisma.commentLike.create({data:{commentID:commentID,userID:userID}})

    }

    async commentUnLike(commentID:string,userID:string){
        const existingLike=await prisma.commentLike.findFirst({where:{commentID:commentID,userID:userID}})
        if(!existingLike){
           throw HttpException.notFound("Comment not Like")
        }
       await prisma.commentLike.delete({where:{id:existingLike.id}})
    }
}