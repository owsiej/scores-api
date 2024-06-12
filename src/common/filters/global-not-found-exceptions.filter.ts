import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestHostname = request.get('host');
    const statusCode = exception.getStatus();
    const { method, protocol, url } = request;
    response.status(statusCode).json({
      statusCode: statusCode,
      request: `Method ${method}, URL: ${protocol}://${requestHostname}${url}`,
      message: 'Page not found.',
    });
  }
}
