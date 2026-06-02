import { NextFunction, Request, Response } from "express";
import { PartyService } from "../service/party.service";

const partyService = new PartyService();

export class PartyController {
    createParty = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        try {

            const result =
                await partyService.createParty(req.body);

            res.status(201).json({
                success: true,
                message: "Party Created Successfully",
                data: result
            });

        } catch (error: any) {

            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message
            });
        }
    };


    // getPartyList = async (
    //     _req: Request,
    //     res: Response
    // ): Promise<void> => {

    //     try {

    //         const result =
    //             await partyService.getPartyList();

    //         res.status(200).json({
    //             success: true,
    //             data: result
    //         });

    //     } catch (error: any) {

    //         res.status(500).json({
    //             success: false,
    //             message: error.message
    //         });
    //     }
    // };


    async getPartyList(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {

            const { page, limit, search } = req.query as {
                page?: string;
                limit?: string;
                search?: string;
            };

            const result = await partyService.getPartyList({
                page: page ? parseInt(page) : 1,
                limit: limit ? parseInt(limit) : 10,
                search: search ?? "",
            });

            res.status(200).json({
                success: true,
                ...result,
            });

        } catch (error: any) {

            res.status(error.statusCode ?? 500).json({
                success: false,
                message: error.message,
            });

        }
    }



    getPartyById = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        try {

            const id = Number(req.params.id);

            const result =
                await partyService.getPartyById(id);

            res.status(200).json({
                success: true,
                data: result
            });

        } catch (error: any) {

            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message
            });
        }
    };

    updateParty = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        try {

            const id = Number(req.params.id);

            const result =
                await partyService.updateParty(
                    id,
                    req.body
                );

            res.status(200).json({
                success: true,
                message: "Party Updated Successfully",
                data: result
            });

        } catch (error: any) {

            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message
            });
        }
    };


    deleteParty = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        try {

            const id = Number(req.params.id);

            const result =
                await partyService.deleteParty(id);

            res.status(200).json({
                success: true,
                ...result
            });

        } catch (error: any) {

            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message
            });
        }
    };
}