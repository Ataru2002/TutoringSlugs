import {Request, Response} from "express";
import firebase from "../services/firebase";
import config from "../config/config";
import { checkMandatoryParams } from '../services/util';

class AuthController {

    static signup = async (req: Request, res: Response) => {

        // Display name and email are already automatically added to firebase auth database

        var mandatoryParams = ["userId", "firstName", "lastName", "email"];
        var missingParam = checkMandatoryParams(req.body, mandatoryParams);
        if(missingParam != null){
            res.status(400).send({message: "The " + missingParam + " parameter is missing. Mandatory params are: " + mandatoryParams});
            return;
        }

        var userId : string = req.body.userId;
        var firstName : string = req.body.firstName;
        var lastName : string = req.body.lastName;
        var email : string = req.body.email;
        var major : string = req.body.major;
        var tutor : boolean = false;
        var fields = {firstName, lastName, email, major, tutor};

        // Add user to the database
        try {
            const result = await firebase.db.collection(config.USERS_COLLECTION).doc(userId).set(fields);
            res.send(result);
        } catch(err){
            res.send(err);
        }
    }

    static login = async (req: Request, res: Response) => {

        var mandatoryParams = ["userId", "idToken"];
        var missingParam = checkMandatoryParams(req.body, mandatoryParams);
        if(missingParam != null){
            res.status(400).send({message: "The " + missingParam + " parameter is missing. Mandatory params are: " + mandatoryParams});
            return;
        }

        // Firebase token
        var idToken = req.body.idToken;
        var userId = req.body.userId;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;

        // TODO: Change expires in
        var expiresIn = 60 * 1000 * 60;

        firebase.admin.auth().createSessionCookie(idToken, { expiresIn })
        .then(async function(sessionCookie){

            // Add user to database if doesnt exist yet
            try {
                const usersRef = firebase.db.collection(config.USERS_COLLECTION).doc(userId);
                const doc = await usersRef.get();

                // User doesn't exist, add to database
                if(!doc.exists){
                    var fields = {firstName, lastName, email, tutor: false};
                    const result = await firebase.db.collection(config.USERS_COLLECTION).doc(userId).set(fields);
                }
            } catch(err){
                res.send(err);
                return;
            }

            const options = { maxAge: expiresIn, httpOnly: false, secure: true, sameSite: 'none' as const};
            res.cookie('session', sessionCookie, options);
            res.end(JSON.stringify({status: "success"}));
        }, (error) => {
            console.log(error);
            res.status(401).send("Unauthorized request.");
        })
    }
}

export default AuthController;