import express, {Application, Router} from 'express';
import CourseController from '../controllers/CourseController';

const app : Application = express();
var router : Router = express.Router();

router.get("/get", CourseController.get);
router.get("/list", CourseController.list);
router.post("/tutor", CourseController.tutor);

export default router;


