import {Request, Response} from "express";
import config from "../config/config";
import * as jwt from "jsonwebtoken";
import * as admin from "firebase-admin";
import serviceAccountKey from "../../serviceAccountKey.json";
const { Firestore } = require("@google-cloud/firestore");

const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount)
});

const db = getFirestore();

class AuthController {
    static login = async (req: Request, res: Response) => {
        // Firebase token
        var firebaseToken = req.body.token;
        console.log("firebase token: " + firebaseToken);

        admin.auth().verifyIdToken(firebaseToken).then(async function(decodedToken){
            console.log("decoded token: ", decodedToken);
            var userId = decodedToken.uid;

            // Sign JWT valid for 1 hour
            const token = jwt.sign(
                {userId},
                config.jwtSecret,
                {expiresIn: "1h"}
            )
            try {
                const docRef = db.collection("users").doc("hello");
                await docRef.set({
                    email: decodedToken.email,
                    name: decodedToken.name
                });
                console.log('Entered new data into the document');
            } catch(err){
                console.log(err);
            }

            res.send(token);
        }).catch((err) => {
            //console.error(err);
            res.send(err);
        });

    }

    static signup = async (req: Request, res: Response) => {
    }

    static logout = async (req: Request, res: Response) => {
        res.send("logged out");
    }
}

export default AuthController;