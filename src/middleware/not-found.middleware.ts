import { Request, Response } from 'express';

export const notFoundMiddleware = (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        type: 'ERROR',
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
};