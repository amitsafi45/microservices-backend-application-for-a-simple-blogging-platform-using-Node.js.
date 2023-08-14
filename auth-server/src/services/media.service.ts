import { existsSync, createReadStream } from 'fs'
import path from 'path'
import { Media, PrismaClient } from '@prisma/client'
import { MediaDTO } from '../dtos/media.dto'
import HttpException from '../utils/HttpException'
import { prisma } from '../config/database.config'
import { TransferImage } from '../utils/transferImageFromTempTOUploadFolder.utils'
import { autoInjectable } from 'tsyringe'

@autoInjectable()
export class MediaService {
  public TEMP_FOLDER_PATH:string
  constructor(){
    
    this.TEMP_FOLDER_PATH = path.join(__dirname, '..', '..', 'public', 'temp')
  }
  async uploadFile(data: MediaDTO, profileID: string,userID:string,connection:any) {
    if (!existsSync(path.join(this.TEMP_FOLDER_PATH, data.type, data.name))) {
      console.log(path.join(this.TEMP_FOLDER_PATH, data.type, data.name),"popoppo")
      throw HttpException.badRequest('Sorry file does not exists')
    }
  
    let newMedia = await connection.media.create({data:{
      name: data.name,
      type: data.type,
      profileID:profileID

    }})
 
    return newMedia
  }

async delete(id:string,connection:any){
    await  connection.media.delete({where:{
      id:id
    }})
}
async updateMedia(data: MediaDTO, profileID: string,userID:string,connection:any){
  if (!existsSync(path.join(this.TEMP_FOLDER_PATH, data.type, data.name))) {
    throw HttpException.badRequest('Sorry file does not exists')
  }
  let newMedia = await connection.media.update({
    where:{
      profileID:profileID
    },
    data:{
      name: data.name,
      type: data.type,      
    }
  })
 
  return newMedia
} 

async findMedia(profileID:string,connection:any){
  return await connection.media.findFirst({where:{
    profileID:profileID
  }})
  
  }
}
