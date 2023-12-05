// auth.ts
// Handles authentication api routes and middlewares. Calls the authentication controller to handle logic.

import express, {Application, Router} from "express";
import AuthController from "../controllers/AuthController";

var router : Router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);

export default router;


