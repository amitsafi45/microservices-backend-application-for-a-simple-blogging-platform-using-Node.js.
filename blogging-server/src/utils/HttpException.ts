import { StatusCodes } from '../constants/statusCodes'

class HttpException extends Error {
  statusCode: number
  code:number
  isCustom: boolean
  constructor(message: string, statusCode: number,code:number) {
    super(message)
    this.statusCode = statusCode
    this.code=code
    this.isCustom = true
    Error.captureStackTrace(this, this.constructor)
  }

  static badRequest(message: string) {
    return new HttpException(message, StatusCodes.BAD_REQUEST,StatusCodes.BAD_REQUEST)
  }
  static unauthorized(message: string) {
    return new HttpException(message, StatusCodes.UNAUTHORIZED,StatusCodes.UNAUTHORIZED)
  }

  static notFound(message: string) {
    return new HttpException(message, StatusCodes.NOT_FOUND,StatusCodes.NOT_FOUND)
  }
  static conflict(message: string) {
    return new HttpException(message, StatusCodes.CONFLICT, StatusCodes.CONFLICT)
  }

  static forbidden(message: string) {
    return new HttpException(message, StatusCodes.FORBIDDEN,StatusCodes.FORBIDDEN)
  }

  static internalServerError(message: string) {
    return new HttpException(message, StatusCodes.INTERNAL_SERVER_ERROR,StatusCodes.INTERNAL_SERVER_ERROR)
  }
  static noContent(message: string) {
    return new HttpException(message, StatusCodes.NO_CONTENT,StatusCodes.NO_CONTENT)
  }
  static serviceUnAvailable(message: string) {
    return new HttpException(message, StatusCodes.SERVICE_UNAVAILABLE,StatusCodes.SERVICE_UNAVAILABLE)
  }
}

export default HttpException