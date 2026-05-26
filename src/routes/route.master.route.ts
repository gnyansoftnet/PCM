import { Router } from "express";
import { VehicleController } from "../controller/vehicle.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { RouteController } from "../controller/route.controller";


const router = Router();
const routeController = new RouteController();
const ROUTE_PAGE_ID = 9;
router.use(authMiddleware);
router.use(permissionMiddleware(ROUTE_PAGE_ID));

router.get("/getAllRoutes", routeController.getAllRoutesByOrgCode.bind(routeController));
router.get("/getRoutesById/:id", routeController.getRouteById.bind(routeController));
router.post("/createRoute", routeController.createRoute.bind(routeController));
router.put("/updateRoute/:id", routeController.updateRoute.bind(routeController));
router.delete("/deleteRoute/:id", routeController.deleteRoute.bind(routeController));

export default router;