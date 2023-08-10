import { autoInjectable } from "tsyringe";
import { PostService } from "../services/post.service";
import { Request, Response, response } from "express";
import { createResponse } from "../utils/response";
import { CreatedMessage } from "../utils/responseMessage.utils";
import { StatusCodes } from "../constants/statusCodes";
import createUUID from "../utils/genrateUUID";

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
}