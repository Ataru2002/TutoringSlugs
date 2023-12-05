// verifyCookie.ts
// Middleware to verify a user session cookie. Required for all authenticated apis and keeps a user signed in across pages of the website.

import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";

export const verifyCookie = (req: Request, res: Response, next: NextFunction) => {
    const sessionCookie = req.cookies.session || '';
    console.log(sessionCookie);

    admin.auth().verifySessionCookie(sessionCookie, true)
    .then((decodedClaims) => {
        console.log("decoded claims: ", decodedClaims)
        req.userId = decodedClaims.user_id;
        next();
    })
    .catch((error) => {
        res.status(404).send(error);
    })

}