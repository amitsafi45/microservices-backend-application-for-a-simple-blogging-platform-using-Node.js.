import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

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