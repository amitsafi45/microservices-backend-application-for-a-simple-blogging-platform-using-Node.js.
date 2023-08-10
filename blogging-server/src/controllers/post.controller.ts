import { autoInjectable } from "tsyringe";
import { PostService } from "../services/post.service";
import { Request, Response, response } from "express";
import { createResponse } from "../utils/response";
import { CreatedMessage, FetchMessage, UpdatedMessage, deletedMessage } from "../utils/responseMessage.utils";
import { StatusCodes } from "../constants/statusCodes";
import createUUID from "../utils/genrateUUID";
import { isUUID } from "class-validator";
import HttpException from "../utils/HttpException";

@autoInjectable()
export class PostController{
    private  postService:PostService
    constructor(postService:PostService){
        this.postService=postService
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
    const post=  await this.postService.delete(req.params.postID)
      return res.send(
          createResponse<object>(
            "success",
            StatusCodes.SUCCESS,
            deletedMessage("Post"),
          ),
        );
    }


    
}