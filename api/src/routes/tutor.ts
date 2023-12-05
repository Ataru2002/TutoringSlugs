// tutor.ts
// Handles tutor api routes and middlewares. Calls the tutor controller to handle logic.

import express, {Application, Router} from "express";
import TutorController from "../controllers/TutorController";

var router : Router = express.Router();

router.post("/list", TutorController.list);

export default router;


