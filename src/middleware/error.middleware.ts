import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app.error';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ─── Log ──────────────────────────────────────────────────────────
  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${err.message}`
  );

  // ─── AppError (WARNING / ERROR) ───────────────────────────────────
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      type: err.statusCode === 400 ? 'WARNING' : 'ERROR',
      message: err.message,
    });
  }

  // ─── MySQL Duplicate Entry ────────────────────────────────────────
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      type: 'ERROR',
      message: 'Duplicate entry found',
    });
  }

  // ─── MySQL Connection Refused ─────────────────────────────────────
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      success: false,
      type: 'ERROR',
      message: 'Database connection refused',
    });
  }

  // ─── MySQL Lost Connection ────────────────────────────────────────
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    return res.status(503).json({
      success: false,
      type: 'ERROR',
      message: 'Database connection lost',
    });
  }

  // ─── MySQL Too Many Connections ───────────────────────────────────
  if (err.code === 'ER_CON_COUNT_ERROR') {
    return res.status(503).json({
      success: false,
      type: 'ERROR',
      message: 'Database has too many connections',
    });
  }

  // ─── MySQL Access Denied ──────────────────────────────────────────
  if (err.code === 'ER_ACCESS_DENIED_ERROR') {
    return res.status(503).json({
      success: false,
      type: 'ERROR',
      message: 'Database access denied',
    });
  }

  // ─── Express Body Parser Error ────────────────────────────────────
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      type: 'ERROR',
      message: 'Invalid JSON in request body',
    });
  }

  // ─── Fallback ─────────────────────────────────────────────────────
  return res.status(err.statusCode || 500).json({
    success: false,
    type: 'ERROR',
    message: err.message || 'Internal Server Error',
  });
};