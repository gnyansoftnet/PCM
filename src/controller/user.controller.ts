import { Request, Response } from "express";
import {
    createUserService,
    getUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
} from "../service/user.service";

import { success, error } from "../utils/response";

export const createUser = async (
    req: Request,
    res: Response
) => {
    try {
        const data = await createUserService(req.body);
        return success(res, data, "User Created");
    } catch (err: any) {
        return error(res, err.message);
    }
};

export const getUsers = async (
    _req: Request,
    res: Response
) => {
    try {
        const data = await getUsersService();
        return success(res, data);
    } catch (err: any) {
        return error(res, err.message);
    }
};

export const getUserById = async (
    req: Request,
    res: Response
) => {
    try {
        const data = await getUserByIdService(
            Number(req.params.id)
        );
        return success(res, data);
    } catch (err: any) {
        return error(res, err.message);
    }
};

export const updateUser = async (
    req: Request,
    res: Response
) => {
    try {
        const data = await updateUserService(
            Number(req.params.id),
            req.body
        );
        return success(res, data, "Updated");
    } catch (err: any) {
        return error(res, err.message);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response
) => {
    try {
        const data = await deleteUserService(
            Number(req.params.id)
        );
        return success(res, data, "Deleted");
    } catch (err: any) {
        return error(res, err.message);
    }
};