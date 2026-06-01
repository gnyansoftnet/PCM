import { Request, Response } from "express";
import { dashboardAction } from "../service/dashboard.service";


export const dashboardActionController = async (
    req: Request,
    res: Response
) => {

    try {

        const result = await dashboardAction(req.body);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error: any) {

        console.error("Dashboard Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};