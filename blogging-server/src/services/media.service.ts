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
  async uploadFile(data: MediaDTO, authorID: string,postID:string,connection:any) {
    if (!existsSync(path.join(this.TEMP_FOLDER_PATH, data.type, data.name))) {
      throw HttpException.badRequest('Sorry file does not exists')
    }
  
    let newMedia = await connection.media.create({data:{
      name: data.name,
      type: data.type,
      authorID:authorID,
      postID:postID

    }})
 
    return newMedia
  }

async delete(id:string,connection:any){
    await  connection.media.delete({where:{
      id:id
    }})
}
async updateMedia(data: MediaDTO, authorID: string,postID:string,connection:any){
  if (!existsSync(path.join(this.TEMP_FOLDER_PATH, data.type, data.name))) {
    throw HttpException.badRequest('Sorry file does not exists')
  }
  let newMedia = await connection.media.update({
    where:{
      postID:postID,
      
    },
    data:{
      name: data.name,
      type: data.type,      
    }
  })
 
  return newMedia
} 

async findMedia(postID:string,connection:any){
  return await connection.media.findFirst({where:{
    postID:postID
  }

  })
  
  }
}
