import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { config } from '../config/config';

export const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    if (config.env === 'development') {
        console.error('Error:', {
            message: err.message,
            stack: err.stack,
            url: req.url,
            method: req.method,
        });
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(config.env === 'development' && { stack: err.stack }),
    });
};
