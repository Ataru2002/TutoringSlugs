import {Request, Response} from "express";
import firebase from "../services/firebase";
import config from "../config/config";

class AuthController {

    static signup = async (req: Request, res: Response) => {

        var userId : string = req.body.userId;
        var firstName : string = req.body.firstName;
        var lastName : string = req.body.lastName;
        var email : string = req.body.email;
        var fields = {firstName, lastName, email};

        // Add user to the database
        try {
            const result = await firebase.db.collection(config.USERS_COLLECTION).doc(userId).set(fields);
            res.send(result);
        }
        catch(err){
            res.send(err);
        }
    }

    static login = async (req: Request, res: Response) => {
        // Firebase token
        var idToken = req.body.idToken;
        var userInfo = req.body.userInfo;
        var userId = userInfo.uid;

        console.log("userinfo: ", userInfo);
        console.log("idtoken: ", idToken);

        var expiresIn = 60 * 1000 * 5;

        firebase.admin.auth().createSessionCookie(idToken, { expiresIn })
        .then(async function(sessionCookie){

            // Add user to database if doesnt exist yet
            try {
                const usersRef = firebase.db.collection(config.USERS_COLLECTION).doc(userId);
                const doc = await usersRef.get();

                // User doesn't exist, add to database
                if(!doc.exists){
                    var firstName = userInfo.displayName.split(" ")[0];
                    var lastName = userInfo.displayName.split(" ")[1];
                    var email = userInfo.email;

                    var fields = {firstName, lastName, email};
                    const result = await firebase.db.collection(config.USERS_COLLECTION).doc(userId).set(fields);
                }
            } catch(err){
                res.send(err);
                return;
            }

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