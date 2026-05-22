import { Response } from "express";

interface AdditionalData {
    [key: string]: any;
}

const returnStatus = (
    res: Response,
    code: number,
    error: boolean,
    message: string,
    additionalData: AdditionalData = {}
) => {
    return res.status(code).json({
        error,
        message,
        status: code,
        ...additionalData,
    });
};

export default returnStatus;