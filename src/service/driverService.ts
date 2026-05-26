import { AppDataSource } from "../config/database";




// GET
export const getDriversService = async () => {

    const sql = `
        SELECT *
        FROM Tbl_01_M_Driver
        WHERE Dflag = 0
        ORDER BY Driver_Id DESC
    `;

    return await AppDataSource.query(sql);
};




// INSERT
export const createDriverService = async (
    data: any
) => {

    const sql = `
        INSERT INTO Tbl_01_M_Driver
        (
            Driver_Name,
            Driver_License_No,
            Driver_Phone_No,
            Driver_Type,
            Fin_Year,
            Org_Code,
            Created_By,
            Created_Date,
            Dflag
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 0)
    `;

    return await AppDataSource.query(
        sql,
        [
            data.Driver_Name,
            data.Driver_License_No,
            data.Driver_Phone_No,
            data.Driver_Type,
            data.Fin_Year,
            data.Org_Code,
            data.Created_By
        ]
    );
};




// UPDATE
export const updateDriverService = async (
    id: number,
    data: any
) => {

    const sql = `
        UPDATE Tbl_01_M_Driver
        SET
            Driver_Name = ?,
            Driver_License_No = ?,
            Driver_Phone_No = ?,
            Driver_Type = ?,
            Modified_By = ?,
            Modified_Date = NOW()
        WHERE Driver_Id = ?
    `;

    return await AppDataSource.query(
        sql,
        [
            data.Driver_Name,
            data.Driver_License_No,
            data.Driver_Phone_No,
            data.Driver_Type,
            data.Modified_By,
            id
        ]
    );
};




// DELETE
export const deleteDriverService = async (
    id: number
) => {

    const sql = `
        update Tbl_01_M_Driver set Dflag=1
        WHERE Driver_Id = ?
    `;

    return await AppDataSource.query(
        sql,
        [id]
    );
};