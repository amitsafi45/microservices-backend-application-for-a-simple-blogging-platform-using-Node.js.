import { IsNotEmpty, IsNumber, IsString } from "class-validator";
 export class ApiDetail{
    @IsNotEmpty()
    @IsString()
    clientName:string

    @IsNotEmpty()
    @IsString()
    host:string

    @IsNotEmpty()
    @IsNumber()
    port:number

    @IsNotEmpty()
    @IsString()
    url:string

}