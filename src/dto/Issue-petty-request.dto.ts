export interface IssuePettyRequest {
    action: string;
    issueId: number;
    voucherNo: string;
    issueDate: Date | string;
    driverId: number;
    vehicleId: number;
    issueRouteId: number;
    partyCode: string;
    driverMobile: string;
    vehicleNo: string;
    driverName: string;
    vehicleType: string;
    issueAmount: number;
    remarks: string;
    orgCode: string;
    createdBy: string;
    cartonQuantity: number;
    gatepassNo: string;
    petrolPumpVoucher: string;
    dieselQuantity: number;
    finYear: string;
    partyDtlJson: PartyDetail[];
    routeDtlJson: RouteDetail[];
}


export interface PartyDetail {
    Party_Code: string;
    Party_Name: string;
    Party_Address: string;
}

export interface RouteDetail {
    Route_Id: number;
    Route_Name: string;

}