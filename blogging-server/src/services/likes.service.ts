import { autoInjectable } from "tsyringe";
import { CommentDTO,  } from "../dtos/blog.dto";
import { prisma } from "../config/database.config";
import HttpException from "../utils/HttpException";

@autoInjectable()
export class LikesService{
    async postLike(postID:string){
       await prisma.postLike.create({data:{postID:postID}})
    }


    async postUnLike(postID:string){
        const existingLike=await prisma.postLike.findFirst({where:{postID:postID}})
         if(!existingLike){
            throw HttpException.notFound("Post not Like")
         }
        await prisma.postLike.delete({where:{id:existingLike.id}})
    }


    async commentLike(commentID:string){
        await prisma.commentLike.create({data:{commentID:commentID}})

    }

    async commentUnLike(commentID:string){
        const existingLike=await prisma.commentLike.findFirst({where:{commentID:commentID}})
        if(!existingLike){
           throw HttpException.notFound("Comment not Like")
        }
       await prisma.commentLike.delete({where:{id:existingLike.id}})
    }
}