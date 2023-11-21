import {Request, Response} from "express";
import config from "../config/config";
import * as jwt from "jsonwebtoken";
import * as admin from "firebase-admin";
import serviceAccountKey from "../../serviceAccountKey.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount)
});

class AuthController {

    static signup = async (req: Request, res: Response) => {

    }

    static login = async (req: Request, res: Response) => {
        // Firebase token
        var idToken = req.body.idToken;

        console.log("idtoken: ", idToken);

        var expiresIn = 60 * 1000 * 5;

        admin.auth().createSessionCookie(idToken, { expiresIn })
        .then((sessionCookie) => {
            const options = { maxAge: expiresIn, httpOnly: false, secure: false, sameSite: 'none' as const};
            res.cookie('session', sessionCookie, options);
            res.end(JSON.stringify({status: "success"}));
        }, (error) => {
            console.log(error);
            res.status(401).send("Unauthorized request.");
        })
    }

    static logout = async (req: Request, res: Response) => {
        res.send("logged out");
    }
}

export default AuthController;