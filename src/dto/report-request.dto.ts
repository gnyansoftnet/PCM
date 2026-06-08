export interface ReportRequestDto {
    p_Action: string;
    p_Issue_Id?: number;
    p_Driver_Id?: number;
    p_Voucher_No?: string;
    p_DisplayLength: number;
    p_DisplayStart: number;
    p_SortCol?: number;
    p_SortDir?: string;
    p_From_Date?: string;
    p_To_Date?: string;
    p_Org_Code?: string;
    p_User_Code?: string;
    p_Fin_Year?: string;
    p_Vehicle_Type?: string;
    p_Vehicle_No?: string;
    p_Type?: string;
    p_Route?: number;
    p_Search?: string;
}