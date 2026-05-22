import jwt, { Secret, SignOptions } from "jsonwebtoken";

const ACCESS_SECRET: Secret =
    process.env.ACCESS_SECRET || "access_secret";

const REFRESH_SECRET: Secret =
    process.env.REFRESH_SECRET || "refresh_secret";

export const generateAccessToken = (
    payload: object
): string => {

    const options: SignOptions = {
        expiresIn: process.env.ACCESS_EXPIRES as SignOptions["expiresIn"]
    };

    return jwt.sign(
        payload,
        ACCESS_SECRET,
        options
    );
};

export const generateRefreshToken = (
    payload: object
): string => {

    const options: SignOptions = {
        expiresIn: process.env.REFRESH_EXPIRES as SignOptions["expiresIn"]
    };

    return jwt.sign(
        payload,
        REFRESH_SECRET,
        options
    );
};


export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_SECRET);
};