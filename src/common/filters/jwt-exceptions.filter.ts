import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { Response } from 'express';

@Catch(JsonWebTokenError)
export class JwtExceptionFilter implements ExceptionFilter {
  catch(exception: JsonWebTokenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const responseBody = {
      statusCode: 401,
      message: exception.message,
    };
    if (exception instanceof TokenExpiredError) {
      responseBody['hasTokenExpired'] = true;
    }
    response.status(401).json(responseBody);
  }
}
