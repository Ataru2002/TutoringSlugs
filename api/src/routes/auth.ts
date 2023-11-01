import express, {Application, Router} from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkjwt";

var router : Router = express.Router();

router.post("/login", AuthController.login);
router.post("/logout", [checkJwt], AuthController.logout);

export default router;


