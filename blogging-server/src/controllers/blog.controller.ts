import { autoInjectable } from "tsyringe";
import { PostService } from "../services/post.service";
import { Request, Response, response } from "express";
import { createResponse } from "../utils/response";
import { CreatedMessage, FetchMessage, UpdatedMessage, deletedMessage } from "../utils/responseMessage.utils";
import { StatusCodes } from "../constants/statusCodes";
import { isNumber, isUUID } from "class-validator";
import HttpException from "../utils/HttpException";
import { CommentService } from "../services/comment.service";
import { LikesService } from "../services/likes.service";
import { getPagingData } from "../utils/pagination";

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
        console.log(req.user,"user")
        await this.postService.create(req.body,req.user.id)
        return res.status(StatusCodes.CREATED).send(
            createResponse<object>(
              true,
              StatusCodes.CREATED,
              CreatedMessage("Post")
            )
          );
    }


    async update(req:Request,res:Response){
      await this.postService.get(req.body.postID)
      await this.postService.update(req.body,req.user.id)
      return res.status(StatusCodes.SUCCESS).send(
          createResponse<object>(
            true,
            StatusCodes.SUCCESS,
            UpdatedMessage("Post")
          )
        );
    }

    async gets(req:Request,res:Response){
      console.log(req.query.page,"hhhh")
      if(!isNumber(Number(req.query.page))&&!isNumber(Number(req.query.perPage))){
        return res.status(StatusCodes.BAD_REQUEST).send(
          createResponse<object>(
            false,
            StatusCodes.BAD_REQUEST,
            "page & perPage should be number",
          ),
        );
      }
   const{list,count}=   await this.postService.gets(Number(req.query.page),Number(req.query.perPage))
   const {total, totalPages, currentPage, perPage}=getPagingData(count,Number(req.query.page),Number(req.query.perPage))

console.log(list,"list")
      return res.status(StatusCodes.SUCCESS).send(
          createResponse<object>(
            true,
            StatusCodes.SUCCESS,
            FetchMessage("Post"),
            undefined,
            list,
            total,
           currentPage,
            perPage,
           totalPages
          )
        );
    }

    async get(req:Request,res:Response){
      if(!isUUID(req.params.postID)){
        throw HttpException.badRequest("Invalid Post ID")
      }
    const post=  await this.postService.get(req.params.postID)
      return res.status(StatusCodes.SUCCESS).send(
          createResponse<object>(
            true,
            StatusCodes.SUCCESS,
            FetchMessage("Post"),
            post,
            undefined
          ),
        );
    }

    async myPost(req:Request,res:Response){
      const post=await this.postService.myPost(req.user.id)
      return res.status(StatusCodes.SUCCESS).send(
        createResponse<object>(
          true,
          StatusCodes.SUCCESS,
          FetchMessage("Post"),
          post
        ),
      );
    }

    async delete(req:Request,res:Response){
      if(!isUUID(req.params.postID)){
        throw HttpException.badRequest("Invalid Post ID")
      }
      await this.postService.delete(req.params.postID)
      return res.status(StatusCodes.SUCCESS).send(
          createResponse<object>(
            true,
            StatusCodes.SUCCESS,
            deletedMessage("Post"),
          ),
        );
    }

    async comment(req:Request,res:Response){
      await this.commentService.create(req.body,req.user.id)
      return res.status(StatusCodes.CREATED).send(
          createResponse<string>(
            true,
            StatusCodes.CREATED,
            CreatedMessage("Comment")
          )
        );
  }
  async commentUpdate(req:Request,res:Response){
    await this.commentService.update(req.body,req.user.id)
    return res.status(StatusCodes.SUCCESS).send(
        createResponse<string>(
          true,
          StatusCodes.SUCCESS,
          UpdatedMessage("Comment")
        )
      );
}
async commentDelete(req:Request,res:Response){
  if(!isUUID(req.params.commentID)){
    throw HttpException.badRequest("Invalid Comment ID")
  }

  await this.commentService.delete(req.params.commentID,req.user.id)
  return res.status(StatusCodes.SUCCESS).send(
      createResponse<string>(
        true,
        StatusCodes.SUCCESS,
        deletedMessage("Comment")
      )
    );
}

async getAllCommentByPostID(req:Request,res:Response){
  if(!isUUID(req.params.postID)){
    throw HttpException.badRequest("Invalid Comment ID")
  }
const comment=  await this.postService.get(req.params.postID)
  return res.status(StatusCodes.SUCCESS).send(
      createResponse<object>(
        true,
        StatusCodes.SUCCESS,
        FetchMessage("Comment"),
        comment,
      ),
    );
}


async  postLike(req:Request,res:Response){
 
  await this.likesService.postLike(req.body,req.user.id)
  return res.status(StatusCodes.CREATED).send(
    createResponse<string>(
      true,
      StatusCodes.CREATED,
      CreatedMessage("Like")
    )
  );
}
async  postUnLike(req:Request,res:Response){
 
  await this.likesService.postUnLike(req.body,req.user.id)
  return res.status(StatusCodes.SUCCESS).send(
    createResponse<string>(
      true,
      StatusCodes.SUCCESS,
    deletedMessage("Like")
    )
  );


}
async  commentLike(req:Request,res:Response){
 
  await this.likesService.commentLike(req.params.commentID,req.user.id)
  return res.status(StatusCodes.CREATED).send(
    createResponse<string>(
      true,
      StatusCodes.CREATED,
      CreatedMessage("Like")
    )
  );
}
async  commentUnLike(req:Request,res:Response){
 
  await this.likesService.commentUnLike(req.params.commentID,req.user.id)
  return res.status(StatusCodes.SUCCESS).send(
    createResponse<string>(
      true,
      StatusCodes.SUCCESS,
      deletedMessage("Like")
    )
  );
}
}