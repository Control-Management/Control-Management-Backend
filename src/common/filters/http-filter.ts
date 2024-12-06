import { Injectable, Logger, Catch, ArgumentsHost, HttpStatus, ExceptionFilter } from "@nestjs/common";
import { Response } from 'express';

@Injectable()
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.getMessage ? exception.getMessage() : exception.message;

    this.logger.error(`Status: ${status}, Message: ${message}, Path: ${request.url}`);


    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: message,
      path: request.url,
    });
  }
}