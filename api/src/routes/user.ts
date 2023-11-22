import express, {Application, Router} from 'express';
import UserController from '../controllers/UserController';
import { checkJwt } from '../middlewares/checkjwt';
import { verifyCookie } from '../middlewares/verifyCookie';

const app : Application = express();
var router : Router = express.Router();

router.get("/", [verifyCookie] , UserController.getUserData);

export default router;