export interface TripSettelmentRequest {
    Action: string;
    Issue_Id: number;
    Voucher_No: string;
    UpdateVoucher_No: string;
    Issue_Date: Date | string;
    Settelment_Date: Date | string;
    Driver_Id: number;  
    Vehicle_Id: number;
    Issue_Route_Id: number;
    Driver_Mobile: string;
    Issue_Amount: number;
    Payble: number;
    Receivable: number;
    Grand_Total: number;
    Remarks: string;
    Route_Name: string;
    Org_Code: string;
    Created_By: string;
    Fin_Year: string;
    HeadDtls: TripSettelmentHeadDtl[];
}
export interface TripSettelmentHeadDtl {
    Head_Id: number;
    Head_Name: string;
    Head_Amount: number;
}





