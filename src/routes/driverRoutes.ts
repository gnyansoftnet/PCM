import express from "express";

import { authMiddleware } from "../middleware/auth.middleware";



import {
    getDrivers,
    postDriver,
    editDriver,
    deleteDriver
} from "../controller/driverController";

const router = express.Router();

router.use(authMiddleware);

// GET ALL DRIVERS
router.get("/getDrivers", getDrivers);



// INSERT DRIVER
router.post("/PostDriver", postDriver);



// EDIT DRIVER
router.put("/EditDriver/:id", editDriver);



// DELETE DRIVER
router.delete("/DeleteDriver/:id", deleteDriver);



export default router;