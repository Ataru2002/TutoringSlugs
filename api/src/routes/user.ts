import express, {Application, Router} from 'express';
import UserController from '../controllers/UserController';
import { checkJwt } from '../middlewares/checkjwt';

const app : Application = express();
var router : Router = express.Router();

router.get("/", [checkJwt] , UserController.get);

export default router;