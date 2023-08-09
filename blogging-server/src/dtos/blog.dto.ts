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
    @IsUUID()
    authorID:string

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