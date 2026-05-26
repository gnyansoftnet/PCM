import { AppDataSource } from "../config/database";
import { RouteMaster } from "../entity/RouteMaster";


export const generateRouteCode = async (): Promise<string> => {
    const routeRepo = AppDataSource.getRepository(RouteMaster);

    const lastRoute = await routeRepo.findOne({
        where: { dflag: false },
        order: { routeId: "DESC" },
        select: {
            routeCode: true,
        },
    });

    let nextNumber = 1;

    if (lastRoute?.routeCode) {
        // Extract number from "ROUTE/0001" → 1
        const parts = lastRoute.routeCode.split("/");
        const lastNumber = parseInt(parts[1], 10);

        if (!isNaN(lastNumber)) {
            nextNumber = lastNumber + 1;
        }
    }

    // Pad to 4 digits: 1 → "0001", 12 → "0012"
    const padded = String(nextNumber).padStart(4, "0");

    return `ROUTE/${padded}`;
};