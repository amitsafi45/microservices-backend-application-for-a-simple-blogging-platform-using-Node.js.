import { existsSync, createReadStream } from 'fs'
import path from 'path'
import { Media } from '@prisma/client'
import { MediaDTO } from '../dtos/media.dto'
import HttpException from '../utils/HttpException'
import { prisma } from '../config/database.config'
import { transferImageFromTempTOUploadFolder } from '../utils/transferImageFromTempTOUploadFolder.utils'


const TEMP_FOLDER_PATH = path.join(__dirname, '..', '..', '..', 'public', 'temp')

class MediaService {

  async uploadFile(data: MediaDTO, id: string) {
    if (!existsSync(path.join(TEMP_FOLDER_PATH, data.type, data.name))) {
      throw HttpException.badRequest('Sorry file does not exists')
    }
    let newMedia = await prisma.media.create({data:{
      name: data.name,
      type: data.type,
    }})
    // transferImageFromTempTOUploadFolder(newMedia.id,newMedia.type,newMedia.name)
    return newMedia
  }



  // async getMedia(email: string, url: string) {
  //   let folderName = email.replace('@gmail.com', '')
  //   let fileLocation = path.join(PUBLIC_FOLDER_PATH, folderName, url)
  //   if (!existsSync(fileLocation)) {
  //     throw HttpException.badRequest('Sorry file does not exists')
  //   }
  //   return createReadStream(fileLocation, { encoding: 'base64' })
  // }
}
export default new MediaService()
