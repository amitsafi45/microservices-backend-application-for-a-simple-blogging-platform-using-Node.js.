import { autoInjectable } from "tsyringe";
import { CommentDTO, UpdateCommentDTO } from "../dtos/blog.dto";
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
  
  
  async update(data: UpdateCommentDTO, commentatorID: string) {
   
  
     await prisma.comment.update({
        where: { id:data.commentID,commentatorID:commentatorID }, 
        data: {
          content: data.content,
          
          updatedAt:new Date(Date.now())
        },
      });
  
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