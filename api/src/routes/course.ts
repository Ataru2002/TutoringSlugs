import express, {Application, Router} from 'express';
import * as courseController from '../controllers/courseController';

const app : Application = express();
var router : Router = express.Router();

router.get("/", courseController.index);

module.exports = router;



