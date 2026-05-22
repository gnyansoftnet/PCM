import { NextFunction, Request, Response } from "express";
import {
    loginUser,

} from "../service/user.service";

import { LoginRequestDto } from "../dto/login.request.dto";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt";

export const loginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body: LoginRequestDto = req.body;
        const result = await loginUser(body);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });

    } catch (error) {
        next(error);
    }
};



export const refreshTokenController = async (
    req: Request,
    res: Response
) => {

    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token required"
        });
    }

    try {

        const decoded: any =
            verifyRefreshToken(refreshToken);

        const newAccessToken =
            generateAccessToken({
                userId: decoded.userId,
                name: decoded.name
            });

        return res.json({
            accessToken: newAccessToken
        });

    } catch (err) {

        return res.status(403).json({
            message: "Invalid refresh token"
        });
    }
};




