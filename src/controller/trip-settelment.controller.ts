import { Request, Response, NextFunction } from "express";
import { OperationAction } from "../enums/operation-action.enum";
import { CashInFlowService } from "../service/cash-inflow.service";
import { asyncHandler } from "../middleware/async-handler";
import { AppError } from "../utils/app.error";
import { PaginationQuery } from "../dto/pagination.query.dto";
import { TripSettelmentService } from "../service/trip-settelment.service";
import { TripSettelmentRequest } from "../dto/trip-settelment-request.dt";




export class TripSettelmentController {
    private readonly tripSettelmentService: TripSettelmentService;
    constructor() {
        this.tripSettelmentService = new TripSettelmentService();
    }

    getAllTripSettlement = asyncHandler(async (req: Request, res: Response) => {
        const orgCode = req.params.orgCode as string;
        const userCode = req.params.userCode as string;
        const fromDate = req.query.fromDate as string;
        const toDate = req.query.toDate as string;
        this.validate(orgCode, 'orgCode');
        this.validate(userCode, 'userCode');

        const query: PaginationQuery = {
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            search: req.query.search as string | undefined,
        };

        const { data, meta } = await this.tripSettelmentService.getAllTripSettlement(orgCode, userCode, fromDate, toDate, query);

        res.status(200).json({ success: true, type: 'SUCCESS', result: data, meta });

    })
    getTripSettelmentByVoucherNumber = asyncHandler(async (req: Request, res: Response) => {
        const {
            voucherNumber
        } = req.body;

        this.validate(voucherNumber, 'voucherNumber');
        const result = await this.tripSettelmentService.getTripSettelmentByVoucherNumber(voucherNumber);
        res.status(
            200
        ).json({
            success: true,
            type: 'SUCCESS',
            result,
        });

    })
    getTripSettelmentPrintByVoucherNumber = asyncHandler(async (req: Request, res: Response) => {
        const {
            voucherNumber
        } = req.body;

        this.validate(voucherNumber, 'voucherNumber');
        const result = await this.tripSettelmentService.getTripSettelmentPrintByVoucherNumber(voucherNumber);
        res.status(
            200
        ).json({
            success: true,
            type: 'SUCCESS',
            result,
        });

    })


    saveUpdateDeleteTripSettelment = asyncHandler(
        async (req: Request, res: Response) => {
            const tripSettelmentRequest: TripSettelmentRequest = req.body;

            this.validate(tripSettelmentRequest.Action, "Action");
            this.validate(tripSettelmentRequest.Org_Code, "Org_Code");
            this.validate(tripSettelmentRequest.Created_By, "Created_By");

            if (tripSettelmentRequest.Action === OperationAction.INSERT) {
                this.validate(tripSettelmentRequest.Issue_Id, "Issue_Id");
                this.validate(tripSettelmentRequest.Voucher_No, "Voucher_No");

                this.validate(tripSettelmentRequest.Issue_Date, "Issue_Date");
                this.validate(tripSettelmentRequest.Settelment_Date, "Settelment_Date");
                this.validate(tripSettelmentRequest.Driver_Id, "Driver_Id");
                this.validate(tripSettelmentRequest.Vehicle_Id, "Vehicle_Id");
                this.validate(tripSettelmentRequest.Issue_Route_Id, "Issue_Route_Id");
                this.validate(tripSettelmentRequest.Driver_Mobile, "Driver_Mobile");
                this.validate(tripSettelmentRequest.Issue_Amount, "Issue_Amount");
                this.validate(tripSettelmentRequest.Payble, "Payble");
                this.validate(tripSettelmentRequest.Receivable, "Receivable");
                this.validate(tripSettelmentRequest.Grand_Total, "Grand_Total");
                this.validate(tripSettelmentRequest.Remarks, "Remarks");
                this.validate(tripSettelmentRequest.Route_Name, "Route_Name");
                this.validate(tripSettelmentRequest.HeadDtls, "HeadDtls");
            }

            if (tripSettelmentRequest.Action === OperationAction.UPDATE) {
                this.validate(tripSettelmentRequest.Issue_Id, "Issue_Id");
                this.validate(tripSettelmentRequest.Voucher_No, "Voucher_No");
                this.validate(tripSettelmentRequest.UpdateVoucher_No, "UpdateVoucher_No");
                this.validate(tripSettelmentRequest.Issue_Date, "Issue_Date");
                this.validate(tripSettelmentRequest.Settelment_Date, "Settelment_Date");
                this.validate(tripSettelmentRequest.Driver_Id, "Driver_Id");
                this.validate(tripSettelmentRequest.Vehicle_Id, "Vehicle_Id");
                this.validate(tripSettelmentRequest.Issue_Route_Id, "Issue_Route_Id");
                this.validate(tripSettelmentRequest.Driver_Mobile, "Driver_Mobile");
                this.validate(tripSettelmentRequest.Issue_Amount, "Issue_Amount");
                this.validate(tripSettelmentRequest.Payble, "Payble");
                this.validate(tripSettelmentRequest.Receivable, "Receivable");
                this.validate(tripSettelmentRequest.Grand_Total, "Grand_Total");
                this.validate(tripSettelmentRequest.Remarks, "Remarks");
                this.validate(tripSettelmentRequest.Route_Name, "Route_Name");
                this.validate(tripSettelmentRequest.HeadDtls, "HeadDtls");

            }

            if (tripSettelmentRequest.Action === OperationAction.DELETE) {
                this.validate(tripSettelmentRequest.Voucher_No, "Voucher_No");
            }

            const message =
                await this.tripSettelmentService.saveUpdateDeleteTripSettelment(tripSettelmentRequest);

            res.status(
                tripSettelmentRequest.Action === OperationAction.INSERT ? 201 : 200
            ).json({
                success: true,
                type: "SUCCESS",
                message,
            });
        }
    );



    private validate(value: any, field: string): void {
        if (value === undefined || value === null || value === '') {
            throw new AppError(`${field} is required`, 400);
        }
    }

}