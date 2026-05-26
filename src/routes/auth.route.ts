import { Router } from "express";
import { UserController } from "../controller/user.controller";


const router = Router();
const userController = new UserController();


router.post("/loginUser", userController.login.bind(userController));
router.post("/refreshToken", userController.refreshToken.bind(userController));

export default router;