export interface UserAccessItem {

    M_Id: number;
    PG_Id: number;
    READ: number;
    WRITE: number;
    UPDATE: number;
    DELETE: number;
    M_Name?: string;
    PG_Name?: string;

}

export interface UserAccessModel {

    User_Code: string;
    Role_Id: number;
    Org_Code: string;
    Created_By: string;
    Role_Access: UserAccessItem[];

}