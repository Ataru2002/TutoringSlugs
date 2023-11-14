import express, {Application, Router} from "express";
import TutorController from "../controllers/TutorController";

var router : Router = express.Router();

router.post("/list", TutorController.list);

export default router;


