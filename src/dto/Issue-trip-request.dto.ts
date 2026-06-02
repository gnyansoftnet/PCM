export interface IssueTripRequest {
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
    partyCode: string;
    partyAddress: string;
    partyName: string;
}

export interface RouteDetail {
    routeId: number;
    routeName: string;
    routeNo: string;
}