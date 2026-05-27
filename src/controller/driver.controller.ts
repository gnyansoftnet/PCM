import { Request, Response } from "express";
import { AppDataSource } from "../config/database";

import {
    getDriversService,
    createDriverService,
    updateDriverService,
    deleteDriverService
} from "../service/driver.service";





// GET ALL
export const getDrivers = async (
    req: Request,
    res: Response
) => {

    try {

        const data = await getDriversService();

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error fetching drivers",
            error
        });
    }
};




// INSERT
export const postDriver = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            Driver_Name,
            Driver_License_No,
            Driver_Phone_No,
            Driver_Type,
            Fin_Year,
            Org_Code,
            Created_By
        } = req.body;

        let Errormsg: string[] = [];



        // DRIVER NAME
        if (!Driver_Name || Driver_Name.trim() === "") {

            Errormsg.push(
                "Driver Name Can Not Be Left Blank"
            );
        }



        // LICENSE
        if (
            !Driver_License_No ||
            Driver_License_No.trim() === ""
        ) {

            Errormsg.push(
                "License No Can Not Be Left Blank"
            );
        }



        // ORG CODE
        if (!Org_Code || Org_Code.trim() === "") {

            Errormsg.push(
                "Org Code Can Not Be Left Blank"
            );
        }



        // PHONE
        const phone = Driver_Phone_No?.trim();

        if (!phone || phone === "") {

            Errormsg.push(
                "Phone No Cannot Be Left Blank"
            );

        } else if (!/^\d{10}$/.test(phone)) {

            Errormsg.push(
                "Phone No must be exactly 10 digits"
            );
        }



        // VALIDATION ERROR
        if (Errormsg.length > 0) {

            return res.status(400).json({
                success: false,
                errors: Errormsg
            });
        }



        // CHECK DUPLICATE DRIVER
        const checkSql = `
            SELECT *
            FROM Tbl_01_M_Driver
            WHERE
                Driver_Name = ?
                AND Driver_Phone_No = ?
                AND Driver_License_No = ?
                AND Dflag = 0
        `;

        const existingDriver =
            await AppDataSource.query(
                checkSql,
                [
                    Driver_Name,
                    Driver_Phone_No,
                    Driver_License_No
                ]
            );



        if (existingDriver.length > 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Driver already exists with same name, phone no and license no"
            });
        }



        // INSERT DRIVER
        const data = await createDriverService({
            Driver_Name,
            Driver_License_No,
            Driver_Phone_No,
            Driver_Type,
            Fin_Year,
            Org_Code,
            Created_By
        });




        res.status(201).json({
            success: true,
            message: "Driver Added Successfully",
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error creating driver",
            error
        });
    }
};




// UPDATE
export const editDriver = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        const data = await updateDriverService(
            id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Driver Updated Successfully",
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error updating driver",
            error
        });
    }
};




// DELETE
export const deleteDriver = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        const data = await deleteDriverService(id);

        res.status(200).json({
            success: true,
            message: "Driver Deleted Successfully",
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error deleting driver",
            error
        });
    }
};