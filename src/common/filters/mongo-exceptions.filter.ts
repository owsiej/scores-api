import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongoose/node_modules/mongodb';
import { CreateErrorResponseDto } from '../dto/create-response-error.dto';

@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    switch (exception.code) {
      case 11000:
        const responseBody: CreateErrorResponseDto = {
          statusCode: 409,
          error: 'Conflict',
          message: 'User with given name already exists.',
        };
        response.status(409).json(responseBody);
        break;
      default:
        const defaultBody: CreateErrorResponseDto = {
          statusCode: 500,
          error: 'Server error.',
          message: exception.errorResponse.message,
        };
        throw new InternalServerErrorException(defaultBody);
    }
  }
}
