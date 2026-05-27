import { AppDataSource } from "../config/database";

/* ---------------- VALIDATION ---------------- */
const validateParty = (data: any) => {
    const errors: string[] = [];

    if (!data.Party_Name?.trim()) {
        errors.push("Party Name Cannot Be Left Blank");
    }

    if (!data.Party_GSTIN?.trim()) {
        errors.push("GSTIN Cannot Be Left Blank");
    }

    if (!data.Phone_No?.trim()) {
        errors.push("Phone No Cannot Be Left Blank");
    } else if (!/^\d{10}$/.test(data.Phone_No)) {
        errors.push("Phone No must be exactly 10 digits");
    }

    if (!data.SAPERP_Code?.trim()) {
        errors.push("SAP/ERP Code Cannot Be Left Blank");
    }

    if (!data.Org_Code?.trim()) {
        errors.push("Org Code Cannot Be Left Blank");
    }

    if (!data.Route_Id) {
        errors.push("Route Cannot Be Left Blank");
    }

    return errors;
};

/* ---------------- DUPLICATE CHECK ---------------- */
const checkDuplicates = async (data: any) => {

    const errors: string[] = [];
    const id = data.Party_Id || 0;

    const name = await AppDataSource.query(
        `SELECT Party_Id FROM Tbl_01_M_Party 
         WHERE Dflag=0 and LOWER(Party_Name) = LOWER(?) AND Party_Id != ?`,
        [data.Party_Name, id]
    );

    if (name.length > 0) {
        errors.push("Party Name Already Exists!");
    }

    const gst = await AppDataSource.query(
        `SELECT Party_Id FROM Tbl_01_M_Party 
         WHERE Dflag=0 and Party_GSTIN = ? AND Party_Id != ?`,
        [data.Party_GSTIN, id]
    );

    if (gst.length > 0) {
        errors.push("GSTIN Already Exists!");
    }

    const phone = await AppDataSource.query(
        `SELECT Party_Id FROM Tbl_01_M_Party 
         WHERE Dflag=0 and Phone_No = ? AND Party_Id != ?`,
        [data.Phone_No, id]
    );

    if (phone.length > 0) {
        errors.push("Phone Number Already Exists!");
    }

    return errors;
};

/* ---------------- SAVE PARTY ---------------- */
export const saveParty = async (data: any) => {

    const validationErrors = validateParty(data);
    const duplicateErrors = await checkDuplicates(data);

    const allErrors = [...validationErrors, ...duplicateErrors];

    if (allErrors.length > 0) {
        return {
            success: false,
            message: allErrors
        };
    }

    const {
        Party_Id,
        Party_Name,
        Party_Address,
        Party_GSTIN,
        Contact_Person,
        Phone_No,
        Email,
        SAPERP_Code,
        Route_Id,
        Fin_Year,
        Org_Code,
        Created_By,
        Modified_By,
        Dflag
    } = data;

    /* ---------------- INSERT ---------------- */
    if (Party_Id == 0) {

        const codeResult: any = await AppDataSource.query(`
            SELECT Party_Code 
            FROM Tbl_01_M_Party 
            ORDER BY Party_Id DESC 
            LIMIT 1
        `);

        let newCode = "PR/0001";

        if (codeResult.length > 0) {
            const last = codeResult[0].Party_Code;
            const num = parseInt(last.split("/")[1]);
            newCode = `PR/${(num + 1).toString().padStart(4, "0")}`;
        }

        const query = `
            INSERT INTO Tbl_01_M_Party
            (
                Party_Code, Party_Name, Party_Address, Party_GSTIN,
                Contact_Person, Phone_No, Email, SAPERP_Code,
                Route_Id, Fin_Year, Org_Code, Created_By,
                Created_Date, Dflag
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW(),?)
        `;

        const values = [
            newCode,
            Party_Name,
            Party_Address,
            Party_GSTIN,
            Contact_Person,
            Phone_No,
            Email,
            SAPERP_Code,
            Route_Id,
            Fin_Year,
            Org_Code,
            Created_By,
            Dflag
        ];

        await AppDataSource.query(query, values);

        return {
            success: true,
            message: "Party Inserted Successfully"
        };
    }

    /* ---------------- UPDATE ---------------- */
    const updateQuery = `
        UPDATE Tbl_01_M_Party
        SET
            Party_Name = ?,
            Party_Address = ?,
            Party_GSTIN = ?,
            Contact_Person = ?,
            Phone_No = ?,
            Email = ?,
            SAPERP_Code = ?,
            Route_Id = ?,
            Fin_Year = ?,
            Org_Code = ?,
            Modified_By = ?,
            Modified_Date = NOW(),
            Dflag = ?
        WHERE Party_Id = ?
    `;

    const values = [
        Party_Name,
        Party_Address,
        Party_GSTIN,
        Contact_Person,
        Phone_No,
        Email,
        SAPERP_Code,
        Route_Id,
        Fin_Year,
        Org_Code,
        Modified_By,
        Dflag,
        Party_Id
    ];

    await AppDataSource.query(updateQuery, values);

    return {
        success: true,
        message: "Party Updated Successfully"
    };
};

/* ---------------- GET LIST ---------------- */
export const getPartyList = async () => {
    return await AppDataSource.query(`
        SELECT * FROM Tbl_01_M_Party where Dflag=0 
        ORDER BY Party_Id DESC
    `);
};

/* ---------------- GET BY ID ---------------- */
export const getPartyById = async (id: number) => {

    if (!id || id <= 0) {
        return {
            success: false,
            message: "Party Id Cannot Be Blank!"
        };
    }

    const result = await AppDataSource.query(
        `SELECT * 
         FROM Tbl_01_M_Party 
         WHERE Dflag = 0 AND Party_Id = ?`,
        [id]
    );

    return {
        success: true,
        data: result
    };
};
/* ---------------- DELETE ---------------- */
export const deleteParty = async (id: number) => {
   
    if (!id || id <= 0) {
        return {
            success: false,
            message: "Party Id Cannot Be Blank!"
        };
    }
    
    const result = await AppDataSource.query(
        `UPDATE Tbl_01_M_Party 
         SET Dflag = 1 
         WHERE Dflag = 0 AND Party_Id = ?`,
        [id]
    );

    return {
        success: true,
        message: "Party Deleted Successfully",
        data: result
    };
};