import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { MediaDTO } from "./media.dto";

export class PostDTO{
    @IsNotEmpty()
    @IsString()
    title:string

    @IsNotEmpty()
    @IsString()
    content:string

  

    @IsNotEmpty()
    @IsArray()
    @IsString({each:true})
    tags:string[]

    @IsOptional()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>MediaDTO)
    media:MediaDTO[]


}

export class CommentDTO{
    @IsNotEmpty()
    @IsUUID()
    postID:string

    @IsNotEmpty()
    @IsString()
    content:string
}


export class UpdatePostDTO extends PostDTO{
    @IsNotEmpty()
    @IsUUID()
    postID:string



}

export class UpdateCommentDTO extends CommentDTO{
    @IsNotEmpty()
    @IsUUID()
    commentID:string
    

}

export class PostLikeDTO{
    @IsNotEmpty()
    @IsUUID()
    postID:string
    

}
export class CommentLikeDTO{
    @IsNotEmpty()
    @IsUUID()
    commentID:string
    
}