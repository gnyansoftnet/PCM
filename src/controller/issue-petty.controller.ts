import { Request, Response, NextFunction } from "express";
import { OperationAction } from "../enums/operation-action.enum";
import { CashInFlowService } from "../service/cash-inflow.service";
import { asyncHandler } from "../middleware/async-handler";
import { AppError } from "../utils/app.error";
import { PaginationQuery } from "../dto/pagination.query.dto";
import { IssuePettyService } from "../service/issue-petty.service";




export class IssuePettyController {
    private readonly issuePettyService: IssuePettyService;
    constructor() {
        this.issuePettyService = new IssuePettyService();
    }

    getAllIssuesPettty = asyncHandler(async (req: Request, res: Response) => {
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

        const { data, meta } = await this.issuePettyService.getAllIssuesPettty(orgCode, userCode, fromDate, toDate, query);

        res.status(200).json({ success: true, type: 'SUCCESS', result: data, meta });

    })
    getIssuePettyByVoucherNumber = asyncHandler(async (req: Request, res: Response) => {
        const {
            voucherNumber
        } = req.body;

        this.validate(voucherNumber, 'voucherNumber');
        const result = await this.issuePettyService.getIssuePettyByVoucherNumber(voucherNumber);
        res.status(
            200
        ).json({
            success: true,
            type: 'SUCCESS',
            result,
        });

    })
    getIssuePettyPrintByVoucherNumber = asyncHandler(async (req: Request, res: Response) => {
        const {
            voucherNumber
        } = req.body;

        this.validate(voucherNumber, 'voucherNumber');
        const result = await this.issuePettyService.getIssuePettyPrintByVoucherNumber(voucherNumber);
        res.status(
            200
        ).json({
            success: true,
            type: 'SUCCESS',
            result,
        });

    })
    getPartyByRoutes = asyncHandler(async (req: Request, res: Response) => {
        const {
            routes
        } = req.body;

        this.validate(routes, 'routes');
        const result = await this.issuePettyService.getPartyByRoutes(routes);
        res.status(
            200
        ).json({
            success: true,
            type: 'SUCCESS',
            result,
        });

    })

    saveUpdateDeleteIssuePetty = asyncHandler(
        async (req: Request, res: Response) => {
            const {
                action,
                issueId,
                voucherNo,
                issueDate,
                driverId,
                vehicleId,
                issueRouteId,
                partyCode,
                driverMobile,
                vehicleNo,
                driverName,
                vehicleType,
                issueAmount,
                remarks,
                orgCode,
                createdBy,
                cartonQuantity,
                gatepassNo,
                petrolPumpVoucher,
                dieselQuantity,
                finYear,
                partyDtlJson,
                routeDtlJson,
            } = req.body;

            this.validate(action, "action");
            this.validate(orgCode, "orgCode");
            this.validate(createdBy, "createdBy");

            if (action === OperationAction.INSERT) {
                this.validate(driverName, "driverName");
                this.validate(issueDate, "issueDate");
                this.validate(driverId, "driverId");
                this.validate(vehicleId, "vehicleId");
                this.validate(vehicleNo, "vehicleNo");
                this.validate(remarks, "remarks");
                this.validate(partyCode, "partyCode");
                this.validate(petrolPumpVoucher, "petrolPumpVoucher");
                this.validate(cartonQuantity, "cartonQuantity");
                this.validate(dieselQuantity, "dieselQuantity");
                this.validate(issueAmount, "issueAmount");
                this.validate(gatepassNo, "gatepassNo");
                this.validate(partyDtlJson, "partyDtlJson");
                this.validate(routeDtlJson, "routeDtlJson");
            }

            if (action === OperationAction.UPDATE) {
                this.validate(issueId, "issueId");
                this.validate(driverName, "driverName");
                this.validate(voucherNo, "voucherNo");
                this.validate(issueDate, "issueDate");
                this.validate(driverId, "driverId");
                this.validate(vehicleId, "vehicleId");
                this.validate(vehicleNo, "vehicleNo");
                this.validate(remarks, "remarks");
                this.validate(partyCode, "partyCode");
                this.validate(petrolPumpVoucher, "petrolPumpVoucher");
                this.validate(cartonQuantity, "cartonQuantity");
                this.validate(dieselQuantity, "dieselQuantity");
                this.validate(issueAmount, "issueAmount");
                this.validate(gatepassNo, "gatepassNo");
                this.validate(partyDtlJson, "partyDtlJson");
                this.validate(routeDtlJson, "routeDtlJson");
            }

            if (action === OperationAction.DELETE) {
                this.validate(voucherNo, "voucherNo");
            }

            const message =
                await this.issuePettyService.saveUpdateDeleteIssuePetty({
                    action,
                    issueId,
                    voucherNo,
                    issueDate,
                    driverId,
                    vehicleId,
                    issueRouteId,
                    partyCode,
                    driverMobile,
                    vehicleNo,
                    driverName,
                    vehicleType,
                    issueAmount,
                    remarks,
                    orgCode,
                    createdBy,
                    cartonQuantity,
                    gatepassNo,
                    petrolPumpVoucher,
                    dieselQuantity,
                    finYear,
                    partyDtlJson,
                    routeDtlJson,
                });

            res.status(
                action === OperationAction.INSERT ? 201 : 200
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