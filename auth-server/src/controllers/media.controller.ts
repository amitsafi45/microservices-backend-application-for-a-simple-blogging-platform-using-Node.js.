import { Request, Response } from 'express'


import HttpException from '../utils/HttpException'
import { createResponse } from '../utils/response';
import { StatusCodes } from 'http-status-codes';
import { Message } from '../constants/message';
import { autoInjectable } from 'tsyringe';
@autoInjectable()
export class MediaController {
  constructor() {}
  async uploadSingle(req: Request, res: Response) {
    res.status(StatusCodes.CREATED).send(
      createResponse<object>(
        true,
        StatusCodes.CREATED,
        Message.mediaUploaded,
        req.file
      )
    );
    
  }


}

