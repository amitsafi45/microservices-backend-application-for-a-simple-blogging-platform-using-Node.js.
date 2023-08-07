import { existsSync, createReadStream } from 'fs'
import path from 'path'
import { Media } from '@prisma/client'
import { MediaDTO } from '../dtos/media.dto'
import HttpException from '../utils/HttpException'
import { prisma } from '../config/database.config'
import { iocContainer } from '../utils/IoCContainer.utils'
import { TransferImage } from '../utils/transferImageFromTempTOUploadFolder.utils'


export class MediaService {
  public TEMP_FOLDER_PATH:string
  constructor(){
    
    this.TEMP_FOLDER_PATH = path.join(__dirname, '..', '..', '..', 'public', 'temp')
  }
  async uploadFile(data: MediaDTO, id: string) {
    if (!existsSync(path.join(this.TEMP_FOLDER_PATH, data.type, data.name))) {
      throw HttpException.badRequest('Sorry file does not exists')
    }
    let newMedia = await prisma.media.create({data:{
      name: data.name,
      type: data.type,
      profileID:id

    }})
    const instance=TransferImage.getInstance()
    instance.setInfo(newMedia.id,newMedia.type,newMedia.name)
    instance.tempTOUploadFolder()
    return newMedia
  }



 
}
iocContainer.register(MediaService,new MediaService())
