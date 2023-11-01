import {Request, Response} from "express";
import config from "../config/config";
import * as jwt from "jsonwebtoken";
import * as admin from "firebase-admin";
import serviceAccountKey from "../../serviceAccountKey.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount)
});

class AuthController {
    static login = async (req: Request, res: Response) => {
        // Firebase token
        var firebaseToken = req.body.token;
        console.log("firebase token: " + firebaseToken);

        admin.auth().verifyIdToken(firebaseToken).then((decodedToken) => {
            console.log("decoded token: ", decodedToken);
            var userId = decodedToken.uid;

            // Sign JWT valid for 1 hour
            const token = jwt.sign(
                {userId},
                config.jwtSecret,
                {expiresIn: "1h"}
            )

            res.send(token);
        }).catch((err) => {
            //console.error(err);
            res.send(err);
        });

    }

    static logout = async (req: Request, res: Response) => {
        res.send("logged out");
    }
}

export default AuthController;