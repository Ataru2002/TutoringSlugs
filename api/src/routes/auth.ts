import express, {Application, Router} from "express";
import AuthController from "../controllers/AuthController";
import { verifyCookie } from '../middlewares/verifyCookie';

var router : Router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);

export default router;


