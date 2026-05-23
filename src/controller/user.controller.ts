import { NextFunction, Request, Response } from "express";
import {
    createUser,
    deleteUser,
    getUsersById,
    getUsersByOrgCode,
    loginUser,
    updateUser,

} from "../service/user.service";

import { LoginRequestDto } from "../dto/login.request.dto";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt";
import { CreateUserRequestDto } from "../dto/create-user.request.dto";
import { parseId } from "../utils/parse_id";

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




export const createUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const body: CreateUserRequestDto = req.body;
        const data = await createUser(body);
        res.status(201).json({ success: true, message: "User created successfully", data });
    } catch (error) {
        next(error);
    }
};


export const updateUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const userId = Number(req.params.userId);

        const body: CreateUserRequestDto = req.body;

        const data = await updateUser(userId, body);

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data
        });

    } catch (error) {
        next(error);
    }
};




export const getUsersByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = parseId(req.params.userId, next);
        if (!userId) return;
        const data = await getUsersById(userId);
        res.status(201).json({ success: true, message: "User created successfully", data });
    } catch (error) {
        next(error);
    }
};
export const getUsersByOrgCodeController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const orgCode: string = req.body;
        const data = await getUsersByOrgCode(orgCode);
        res.status(200).json({ success: true, message: "Successfully", data });
    } catch (error) {
        next(error);
    }
};


export const deleteUsersByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = parseId(req.params.userId, next);
        if (!userId) return;
        const data = await deleteUser(userId);
        res.status(200).json({ success: true, message: "User delete successfully", data });
    } catch (error) {
        next(error);
    }
};




