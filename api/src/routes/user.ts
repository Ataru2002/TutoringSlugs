import express, {Application, Router} from 'express';
import UserController from '../controllers/UserController';
import { verifyCookie } from '../middlewares/verifyCookie';

const app : Application = express();
var router : Router = express.Router();

router.get("/", [verifyCookie] , UserController.getUserData);
router.post("/tutor", [verifyCookie], UserController.tutor);
router.post("/updateUser", UserController.updateUser);

export default router;