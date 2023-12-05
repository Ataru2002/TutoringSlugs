// routes.ts
// Handles all routing by delegating to the according route class.

import express, {Application, Router} from "express";
import auth from "./auth";
import user from "./user";
import course from "./course";
import tutor from "./tutor";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/course", course);
routes.use("/tutor", tutor);

export default routes;