import { Request } from "express";
import { validationResult } from "express-validator";

export const assertValid = (req: Request): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = Object.assign(new Error("Validation failed"), {
            statusCode: 422,
            errors: errors.array(),
        });
        throw err;
    }
};