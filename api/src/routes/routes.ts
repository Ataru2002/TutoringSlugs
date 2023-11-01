import express, {Application, Router} from "express";
import auth from "./auth";
import user from "./user";
import course from "./course";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/course", course);

export default routes;