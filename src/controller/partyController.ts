import { Request, Response } from "express";
import * as partyService from "../service/partyService";

export const saveParty = async (req: Request, res: Response) => {

    try {

        const result = await partyService.saveParty(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

         return res.status(200).json({
            success: true,
            message: result.message
        });
  

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getPartyList = async (_req: Request, res: Response) => {

    try {

        const data = await partyService.getPartyList();

        return res.status(200).json({
            success: true,
            data: data   
        });

    } catch (error: any) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getPartyById = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        const result = await partyService.getPartyById(id);
       
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

        if (!result.data || result.data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Data Found"
            });
        }
        return res.status(200).json({
            success: true,
            data: result.data
        });

    } catch (error: any) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteParty = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        const result = await partyService.deleteParty(id);
     
        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error: any) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};