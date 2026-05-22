import { Router } from "express";
import {
    loginController,
    refreshTokenController,

} from "../controller/user.controller";

const router = Router();

router.post("/loginUser", loginController);
router.post("/refreshToken", refreshTokenController);


export default router;