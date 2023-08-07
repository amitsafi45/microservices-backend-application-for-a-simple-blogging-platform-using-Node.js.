import { NextFunction, Request, Response } from 'express'
import EnvironmentConfiguration from '../config/env.config';


import { Environment } from '../constants/enum';
import { Message } from '../constants/message';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.debug('Error Handler')
  console.error(error)

  let statusCode = 500

  let data = {
    success: false,
    message: Message.server,
    data: [],
    ...(EnvironmentConfiguration.NODE_ENV === Environment.DEVELOPMENT && { originalError: error.message }),
  }
  if (error.isCustom) {
    statusCode = error.statusCode
    data = {
      ...data,
      message: error.message,
    }
  }
   return res.status(statusCode).json(data)
}

export default errorHandler