import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { Request, Response} from 'express';

export interface ErrorResponse {
    statusCode: number;
    error: string;
    message: string | string[];
    path: string;
    timestamp: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);
    
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        let satus = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | string[] = 'Error interno del servidor';
        let error = 'Internal server error';

        if (exception instanceof HttpException) {
            satus = exception.getStatus();
            const body = exception.getStatus();
            if (typeof body === 'string'){
                message = body;
                error = exception.name;
            } else {
                const b = body as {message?: string | string[], error?: string};
                message = b.message ?? exception.message;
                error = b.error || exception.name;
            }
        } else {
            this.logger.error(
                exception instanceof Error ? exception.stack : String(exception),
            );
        }

        const payload: ErrorResponse = {
            statusCode: satus,
            error,
            message,
            path: request.url,
            timestamp: new Date().toISOString(),
        };
        response.status(satus).json(payload);
    }
}
