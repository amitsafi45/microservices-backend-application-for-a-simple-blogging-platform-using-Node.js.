import { Request, Response, NextFunction } from 'express'
import { UploadedFile } from 'express-fileupload'
import HttpException from '../utils/HttpException'
import { MediaType } from '../constants/enum'
// import UploadHelper from '../utils/upload.utils'
import { randomBytes } from 'crypto'
import { UploadHelper } from '../utils/upload.utils'
import { autoInjectable } from 'tsyringe'


@autoInjectable()
  export class Upload{
    public uploadHelper:UploadHelper
    public mediaTypes:any
    constructor(uploadHelper:UploadHelper){
      this.uploadHelper=uploadHelper
      this.mediaTypes=Object.values(MediaType)
    }
  single(fieldName: string){
    return async (req: Request, res: Response, next: NextFunction) => {
      if (!req.files) {
       throw HttpException.badRequest('No file uploaded')
      }
      if (Object.keys(req.files).length !== 1) {
       return next( HttpException.badRequest('Only one file can be uploaded'))
      }
      if (!this.mediaTypes.includes(req.body.type)) {
       return next( HttpException.badRequest('Invalid media type'))
      }
      try {
        const file = req.files[fieldName] as UploadedFile
        const fileName = `${Date.now()}__${randomBytes(3).toString('hex')}__${file.name}`
        let fileData = await this.uploadHelper.help(fileName, file, req.body.type)
        req.file = {
          name: fileName,
          type: req.body.type,
        }
  
        next()
      } catch (error) {
        next(error)
      }
    }
  }

 
} 

