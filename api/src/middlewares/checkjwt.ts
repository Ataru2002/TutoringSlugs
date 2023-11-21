import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from Bearer Token
  const authHeader = req.headers["authorization"] as string;
  const accessToken = authHeader && authHeader.split(" ")[1];

  if(accessToken == null) return res.sendStatus(401);

  try {
      var payload = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
      console.log(payload);
      next();
  }
  catch(error){
      res.sendStatus(403);
  }
  /*
  let jwtPayload;

  //Try to validate the token and get data


  try {
    jwtPayload = <any>jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const {userId} = jwtPayload;
  const newToken = jwt.sign({userId}, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();*/
};