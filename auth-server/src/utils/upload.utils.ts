import { MediaType } from '../constants/enum'
import { UploadedFile } from 'express-fileupload'
import HttpException from './HttpException'
import path from 'path'
import fs from 'fs'

const PUBLIC_FOLDER_PATH = path.join(__dirname, '..', '..', 'public')
const UPLOADS_FOLDER_PATH = path.join(__dirname, '..', '..', 'public', 'temp')

const UploadHelper = (fileName: string, file: UploadedFile, type: MediaType) => {
  return new Promise((resolve, reject) => {
    const fileExtension = path.extname(file.name)
    const fileSize = file.size

    let supportedExtensions: string[]

    let maxFileSize: number

    switch (type) {
      case MediaType.PROFILE:
        supportedExtensions = ['.png', '.jpg', '.jpeg']
        maxFileSize = 2 * 1024 * 1024 //* 2 MB
        break
   

      default:
        throw HttpException.badRequest('Invalid media type')
    }

    let isValidExtension = supportedExtensions.includes(fileExtension)
    let isValidFileSize = fileSize <= maxFileSize

    if (!isValidExtension)
      throw HttpException.badRequest(`Invalid file format. Only ${supportedExtensions.join(', ')} files are supported`)

    if (!isValidFileSize)
      throw HttpException.badRequest(`File size too large. Maximum file size is ${maxFileSize / 1000000}MB`)

    const folderPath = path.join(UPLOADS_FOLDER_PATH, type)

    // *Enure that the folder exists
    !fs.existsSync(PUBLIC_FOLDER_PATH) && fs.mkdirSync(PUBLIC_FOLDER_PATH)
    !fs.existsSync(UPLOADS_FOLDER_PATH) && fs.mkdirSync(UPLOADS_FOLDER_PATH)
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

export default UploadHelper
