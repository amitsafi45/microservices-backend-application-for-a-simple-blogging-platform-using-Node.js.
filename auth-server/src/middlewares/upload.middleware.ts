import { Request, Response, NextFunction } from 'express'
import { UploadedFile } from 'express-fileupload'
import HttpException from '../utils/HttpException'
import { MediaType } from '../constants/enum'
// import UploadHelper from '../utils/upload.utils'
import { randomBytes } from 'crypto'
import { UploadHelper } from '../utils/upload.utils'
import { iocContainer } from '../utils/IoCContainer.utils'



  export class Upload{
    public uploadHelper:UploadHelper
    public mediaTypes:any
    constructor(){
      this.uploadHelper=iocContainer.resolve(UploadHelper)
      this.mediaTypes=Object.values(MediaType)
    }
  single(fieldName: string){
    console.log(fieldName)
    return async (req: Request, res: Response, next: NextFunction) => {
      if (!req.files) {
        console.log("second")
       return next( HttpException.badRequest('No file uploaded'))
      }
      // console.log(req.files)
      console.log("first")
     // *Ensure that only one file is uploaded
      if (Object.keys(req.files).length !== 1) {
       return next( HttpException.badRequest('Only one file can be uploaded'))
      }
  console.log("third")
      if (!this.mediaTypes.includes(req.body.type)) {
       return next( HttpException.badRequest('Invalid media type'))
      }
      try {
        console.log(req.files)
        console.log(fieldName,"fffff")
        const file = req.files[fieldName] as UploadedFile
         console.log(file,"file")
        const fileName = `${Date.now()}__${randomBytes(3).toString('hex')}__${file.name}`
        let fileData = await this.uploadHelper.help(fileName, file, req.body.type)
console.log("third")
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
export default new Upload()
// iocContainer.register(Upload,new Upload())
