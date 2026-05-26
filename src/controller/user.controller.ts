import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user.service";
import { LoginRequestDto } from "../dto/login.request.dto";
import { CreateUserRequestDto } from "../dto/create-user.request.dto";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt";
import { parseId } from "../utils/parse_id";

const userService = new UserService();

export class UserController {

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body: LoginRequestDto = req.body;
            const result = await userService.loginUser(body);
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                res.status(401).json({ success: false, message: "Refresh token required" });
                return;
            }

            const decoded: any = verifyRefreshToken(refreshToken);
            const newAccessToken = generateAccessToken({
                userId: decoded.userId,
                name: decoded.name
            });

            res.status(200).json({
                success: true,
                data: { accessToken: newAccessToken }
            });
        } catch (error) {
            res.status(403).json({ success: false, message: "Invalid refresh token" });
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body: CreateUserRequestDto = req.body;
            const data = await userService.createUser(body);
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = parseInt(req.params.userId as string);
            if (isNaN(userId)) {
                res.status(400).json({ success: false, message: "Invalid user ID." });
                return;
            }

            const body: CreateUserRequestDto = req.body;
            const data = await userService.updateUser(userId, body);
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = parseId(req.params.userId, next);
            if (!userId) return;

            const data = await userService.getUsersById(userId);
            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async getUsersByOrgCode(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orgCode = req.params.orgCode as string;
            if (!orgCode) {
                res.status(400).json({ success: false, message: "orgCode is required." });
                return;
            }

            const data = await userService.getUsersByOrgCode(orgCode);
            res.status(200).json({
                success: true,
                message: "Successfully",
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = parseId(req.params.userId, next);
            if (!userId) return;

            const data = await userService.deleteUser(userId);
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data
            });
        } catch (error) {
            next(error);
        }
    }
}