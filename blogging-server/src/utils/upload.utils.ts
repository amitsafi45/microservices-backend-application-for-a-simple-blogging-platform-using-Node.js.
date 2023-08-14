import { MediaType } from '../constants/enum'
import { UploadedFile } from 'express-fileupload'
import HttpException from './HttpException'
import path from 'path'
import fs from 'fs'
import { autoInjectable } from 'tsyringe'

@autoInjectable()
export class UploadHelper{
  public PUBLIC_FOLDER_PATH:string
  public UPLOADS_FOLDER_PATH:string
constructor(){
  this.PUBLIC_FOLDER_PATH=path.join(__dirname, '..', '..', 'public')
  this.UPLOADS_FOLDER_PATH=path.join(__dirname, '..', '..', 'public', 'temp')
}

  async help (fileName: string, file: UploadedFile, type: MediaType){
    return new Promise((resolve, reject) => {
      const fileExtension = path.extname(file.name)
      const fileSize = file.size
  
      let supportedExtensions: string[]
  
      let maxFileSize: number
  
      switch (type) {
        case MediaType.BLOG:
          supportedExtensions = ['.png', '.jpg', '.jpeg']
          maxFileSize = 2 * 1024 * 1024 //* 2 MB
          break;
     
  
        default:
          throw HttpException.badRequest('Invalid media type')
      }
  
      let isValidExtension = supportedExtensions.includes(fileExtension)
      let isValidFileSize = fileSize <= maxFileSize
  
      if (!isValidExtension)
        throw HttpException.badRequest(`Invalid file format. Only ${supportedExtensions.join(', ')} files are supported`)
  
      if (!isValidFileSize)
        throw HttpException.badRequest(`File size too large. Maximum file size is ${maxFileSize / 1000000}MB`)
  
      const folderPath = path.join(this.UPLOADS_FOLDER_PATH, type)
  
      // *Enure that the folder exists
      !fs.existsSync(this.PUBLIC_FOLDER_PATH) && fs.mkdirSync(this.PUBLIC_FOLDER_PATH)
      !fs.existsSync(this.UPLOADS_FOLDER_PATH) && fs.mkdirSync(this.UPLOADS_FOLDER_PATH)
      !fs.existsSync(folderPath) && fs.mkdirSync(folderPath)
  
      const filePath = path.join(folderPath, fileName)
      file.mv(filePath, (err) => {
        if (err) {
          reject({ error: 'cannot upload files' })
        } else {
          resolve(file)
        }
      })
    })
  }
  
}