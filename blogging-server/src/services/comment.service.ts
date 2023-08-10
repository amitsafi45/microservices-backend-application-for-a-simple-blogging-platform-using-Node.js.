import { autoInjectable } from "tsyringe";
import { CommentDTO } from "../dtos/blog.dto";
import { prisma } from "../config/database.config";
import HttpException from "../utils/HttpException";

@autoInjectable()
export class CommentService{
  async create(data:CommentDTO,commentatorID:string){
    await prisma.comment.create({data:{
       commentatorID:commentatorID,
       postID:data.postID,
       content:data.content
    }})
  }
  
  
  async update(data: CommentDTO, commentatorID: string) {
    const existingComment = await prisma.comment.findFirst({
      where: {
        AND: [
          { commentatorID: commentatorID },
          { postID: data.postID },
        ],
      },
    });
  
    if (existingComment) {
      const updatedComment = await prisma.comment.update({
        where: { id: existingComment.id }, 
        data: {
          content: data.content,
          updatedAt:new Date(Date.now())
        },
      });
  
      return updatedComment;
    } else {
      throw HttpException.notFound('Comment not found.');
    }
  }
  
  
  async getAllCommentByPostID(postID:string){
    const comment = await prisma.comment.findMany({
        where: {
          postID:postID
        },
      });  
      return comment
  }
  
  async delete(id:string,commentatorID:string){
     await prisma.comment.delete({where:{id:id,commentatorID:commentatorID}})
  }
  
} 