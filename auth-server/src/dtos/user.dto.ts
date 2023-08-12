import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { MediaDTO } from "./media.dto";

export class RegisterDTO{
   @IsNotEmpty()
   @IsString()
   username:string

   @IsNotEmpty()
   @IsEmail()
   email:string

   @IsNotEmpty()
   @IsString()
   password:string

}

export class UpdateRegisterDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
export class  LoginDTO{
  @IsNotEmpty()
   @IsEmail()
   email:string

   @IsNotEmpty()
   @IsString()
   password:string 
}


export class  ProfileDTO{
  

 

   @IsOptional()
   @IsString()
   bio:string

   @IsOptional()
   @IsArray()
   @IsString({each:true})
   socialMediaLink:string[]

   @IsOptional()
   @IsNotEmptyObject()
   @ValidateNested()
   @Type(()=>MediaDTO)
   media:MediaDTO


   @IsOptional()
   @IsString()
   address:string


}