// course.ts
// Handles course api routes and middlewares. Calls the course controller to handle logic.

import express, {Application, Router} from 'express';
import CourseController from '../controllers/CourseController';

const app : Application = express();
var router : Router = express.Router();

router.get("/get", CourseController.get);
router.get("/list", CourseController.list);

export default router;