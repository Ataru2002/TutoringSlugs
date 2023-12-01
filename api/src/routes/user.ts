import express, {Application, Router} from 'express';
import UserController from '../controllers/UserController';
import { verifyCookie } from '../middlewares/verifyCookie';

const app : Application = express();
var router : Router = express.Router();

router.get("/", [verifyCookie] , UserController.getUserData);
router.post("/updateTutor", [verifyCookie], UserController.updateTutor);
router.post("/updateUser", [verifyCookie], UserController.updateUser);
router.post("/uploadProfilePhoto", [verifyCookie, express.raw({inflate: true, limit: '50mb', type: () => true})], UserController.uploadProfilePhoto);

export default router;