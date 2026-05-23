// utils/parse_id.ts
import { NextFunction } from "express";

export const parseId = (param: string | string[], next: NextFunction): number | null => {
    const raw = Array.isArray(param) ? param[0] : param;  // ← handles string[]
    const parsed = parseInt(raw, 10);

    if (isNaN(parsed)) {
        next(Object.assign(new Error("Invalid ID format"), { statusCode: 400 }));
        return null;
    }
    return parsed;
};