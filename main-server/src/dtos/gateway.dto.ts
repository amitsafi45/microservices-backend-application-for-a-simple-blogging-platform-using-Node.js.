import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Status } from "../constants/enum";
 export class ApiDetail{
    @IsNotEmpty()
    @IsString()
    clientName:string

    @IsNotEmpty()
    @IsString()
    host:string

    @IsNotEmpty()
    @IsEnum(Status)
    status:Status
    

    @IsNotEmpty()
    @IsString()
    serviceName:string

    @IsNotEmpty()
    @IsNumber()
    port:number

   

}

export class ServiceStatusDTO{
    @IsNotEmpty()
    @IsEnum(Status)
    status:Status
    

    @IsNotEmpty()
    @IsString()
    serviceName:string

}