import { autoInjectable } from "tsyringe";
import { PostService } from "../services/post.service";
import { Request, Response, response } from "express";
import { createResponse } from "../utils/response";
import { CreatedMessage, FetchMessage, UpdatedMessage, deletedMessage } from "../utils/responseMessage.utils";
import { StatusCodes } from "../constants/statusCodes";
import createUUID from "../utils/genrateUUID";
import { isUUID } from "class-validator";
import HttpException from "../utils/HttpException";
import { CommentService } from "../services/comment.service";
import { LikesService } from "../services/likes.service";

@autoInjectable()
export class BlogController{
    private  postService:PostService
    private commentService:CommentService
    private  likesService:LikesService
    constructor(postService:PostService,commentService:CommentService,likesService:LikesService){
        this.postService=postService
        this.commentService=commentService
        this.likesService=likesService
    }
    async create(req:Request,res:Response){
        let authorID=await createUUID()
        await this.postService.create(req.body,authorID)
        return res.send(
            createResponse<string>(
              "success",
              StatusCodes.SUCCESS,
              CreatedMessage("Post")
            )
          );
    }


    async update(req:Request,res:Response){
      let authorID=await createUUID()
      await this.postService.update(req.body,authorID)
      return res.send(
          createResponse<string>(
            "success",
            StatusCodes.SUCCESS,
            UpdatedMessage("Post")
          )
        );
    }

    async gets(req:Request,res:Response){
   const post=   await this.postService.gets()
      return res.send(
          createResponse<object>(
            "success",
            StatusCodes.SUCCESS,
            FetchMessage("Post"),
            post
          )
        );
    }

    async get(req:Request,res:Response){
      if(isUUID(req.params.postID)){
        throw HttpException.badRequest("Invalid Post ID")
      }
    const post=  await this.postService.get(req.params.postID)
      return res.send(
          createResponse<object>(
            "success",
            StatusCodes.SUCCESS,
            FetchMessage("Post"),
            post
          ),
        );
    }
    async delete(req:Request,res:Response){
      if(isUUID(req.params.postID)){
        throw HttpException.badRequest("Invalid Post ID")
      }
      await this.postService.delete(req.params.postID)
      return res.send(
          createResponse<object>(
            "success",
            StatusCodes.SUCCESS,
            deletedMessage("Post"),
          ),
        );
    }

    async comment(req:Request,res:Response){
      let authorID=await createUUID()
      await this.commentService.create(req.body,authorID)
      return res.send(
          createResponse<string>(
            "success",
            StatusCodes.SUCCESS,
            CreatedMessage("Comment")
          )
        );
  }
  async commentUpdate(req:Request,res:Response){
    let authorID=await createUUID()
    await this.commentService.update(req.body,authorID)
    return res.send(
        createResponse<string>(
          "success",
          StatusCodes.SUCCESS,
          UpdatedMessage("Comment")
        )
      );
}
async commentDelete(req:Request,res:Response){
  if(isUUID(req.params.commentID)){
    throw HttpException.badRequest("Invalid Comment ID")
  }
  let authorID=await createUUID()

  await this.commentService.delete(req.params.commentID,authorID)
  return res.send(
      createResponse<string>(
        "success",
        StatusCodes.SUCCESS,
        deletedMessage("Comment")
      )
    );
}

async getAllCommentByPostID(req:Request,res:Response){
  if(isUUID(req.params.postID)){
    throw HttpException.badRequest("Invalid Comment ID")
  }
const comment=  await this.postService.get(req.params.postID)
  return res.send(
      createResponse<object>(
        "success",
        StatusCodes.SUCCESS,
        FetchMessage("Comment"),
        comment
      ),
    );
}


async  postLike(req:Request,res:Response){
  if(isUUID(req.params.postID)){
    throw HttpException.badRequest("Invalid Post ID")
  }
  await this.likesService.postLike(req.params.postID)
  return res.send(
    createResponse<string>(
      "success",
      StatusCodes.SUCCESS,
      CreatedMessage("Like")
    )
  );
}
async  postUnLike(req:Request,res:Response){
  if(isUUID(req.params.postID)){
    throw HttpException.badRequest("Invalid Post ID")
  }
  await this.likesService.postUnLike(req.params.postID)
  return res.send(
    createResponse<string>(
      "success",
      StatusCodes.SUCCESS,
    deletedMessage("Like")
    )
  );


}
async  commentLike(req:Request,res:Response){
  if(isUUID(req.params.commentID)){
    throw HttpException.badRequest("Invalid Comment ID")
  }
  await this.likesService.commentLike(req.params.commentID)
  return res.send(
    createResponse<string>(
      "success",
      StatusCodes.SUCCESS,
      CreatedMessage("Like")
    )
  );
}
async  commentUnLike(req:Request,res:Response){
  if(isUUID(req.params.commentID)){
    throw HttpException.badRequest("Invalid Comment ID")
  }
  await this.likesService.commentUnLike(req.params.commentID)
  return res.send(
    createResponse<string>(
      "success",
      StatusCodes.SUCCESS,
      deletedMessage("Like")
    )
  );
}
}