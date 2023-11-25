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