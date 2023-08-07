import { Request, Response, NextFunction } from 'express'
import { UploadedFile } from 'express-fileupload'
import HttpException from '../utils/HttpException'
import { MediaType } from '../constants/enum'
import UploadHelper from '../utils/upload.utils'
import { randomBytes } from 'crypto'

let mediaTypes = Object.values(MediaType)

const upload = {
  single: (fieldName: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (!req.files) {
        throw HttpException.badRequest('No file uploaded')
      }
      // *Ensure that only one file is uploaded
      if (Object.keys(req.files).length !== 1) {
        throw HttpException.badRequest('Only one file can be uploaded')
      }

      if (!mediaTypes.includes(req.body.type)) {
        throw HttpException.badRequest('Invalid media type')
      }
      try {
        const file = req.files[fieldName] as UploadedFile

        const fileName = `${Date.now()}__${randomBytes(3).toString('hex')}__${file.name}`
        let fileData = await UploadHelper(fileName, file, req.body.type)

        req.file = {
          name: fileName,
          type: req.body.type,
        }

        next()
      } catch (error) {
        next(error)
      }
    }
  },

 
}

export default upload
