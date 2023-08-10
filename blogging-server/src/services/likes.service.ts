import { autoInjectable } from "tsyringe";
import { CommentDTO, CommentLikeDTO, PostLikeDTO } from "../dtos/blog.dto";
import { prisma } from "../config/database.config";
import HttpException from "../utils/HttpException";

@autoInjectable()
export class LikesService{
    async postLike(data:PostLikeDTO){
       await prisma.postLike.create({data:{postID:data.postID}})
    }
    async postUnLike(data:PostLikeDTO){
        const existingLike=await prisma.postLike.findFirst({where:{postID:data.postID}})
         if(!existingLike){
            throw HttpException.notFound("Post not Like")
         }
        await prisma.postLike.delete({where:{id:existingLike.id}})
    }

    async commentLike(data:CommentLikeDTO){
        await prisma.commentLike.create({data:{commentID:data.commentID}})

    }
    async commentUnlike(data:CommentLikeDTO){
        const existingLike=await prisma.commentLike.findFirst({where:{commentID:data.commentID}})
        if(!existingLike){
           throw HttpException.notFound("Comment not Like")
        }
       await prisma.commentLike.delete({where:{id:existingLike.id}})
    }
}