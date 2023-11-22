"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const checkJwt = (req, res, next) => {
    //Get the jwt token from Bearer Token
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (accessToken == null)
        return res.sendStatus(401);
    try {
        var payload = jwt.verify(accessToken, config_1.default.ACCESS_TOKEN_SECRET);
        console.log(payload);
        next();
    }
    catch (error) {
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
exports.checkJwt = checkJwt;
