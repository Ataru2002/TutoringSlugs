// user.ts
// Handles user api routes and middlewares. Calls the user controller to handle logic.

import express, {Application, Router} from 'express';
import UserController from '../controllers/UserController';
import { verifyCookie } from '../middlewares/verifyCookie';

const app : Application = express();
var router : Router = express.Router();

router.get("/", [verifyCookie] , UserController.getUserData);
router.post("/updateTutor", [verifyCookie], UserController.updateTutor);
router.post("/updateUser", [verifyCookie], UserController.updateUser);
router.post("/uploadProfilePhoto", [verifyCookie, express.raw({inflate: true, limit: '50mb', type: () => true})], UserController.uploadProfilePhoto);
router.post("/uploadTranscript", [verifyCookie, express.raw({inflate: true, limit: '50mb', type: "pdf"})], UserController.uploadTranscript);

export default router;