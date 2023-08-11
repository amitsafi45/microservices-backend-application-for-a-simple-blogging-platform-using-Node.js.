import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import HttpException from "../utils/HttpException";
import { Express, NextFunction, Request, Response } from "express";
export default class RequestValidator {
  static async getValidationMessage(
    errors: ValidationError[],
    message: string[]
    ) {
      errors.forEach(async (err) => {
        if (err.children && err.children?.length > 0) {
          await this.getValidationMessage(err.children, message);
        } else {
          if (err.constraints) {
          Object.values(err.constraints).forEach((value) => {
            message.push(value);
          });
        }
        return;
      }
    });
  }
  static validate = <T extends object>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      // *Convert body to class instance
      const convertedObject = plainToClass(classInstance, req.body); // *Validate the class instance

      let validationMessages: string[] = [];
      const errors = await validate(convertedObject, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      if (errors.length !== 0) {
        this.getValidationMessage(errors, validationMessages);
        next(HttpException.badRequest(validationMessages[0]));
      }

      return next();
    };
  };
}
