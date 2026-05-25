export interface RoleAccessItem {

    M_Id: number;
    PG_Id: number;
    READ: number;
    WRITE: number;
    UPDATE: number;
    DELETE: number;

}

export interface RoleAccessModel {

    Role_Id: number;
    Org_Code: string;
    Created_By: string;
    Role_Access: RoleAccessItem[];

}