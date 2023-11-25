import {Request, Response} from 'express';
import firebase from "../services/firebase";
import config from "../config/config";

class UserController {

    static getUserData = async (req: Request, res: Response) => {
        var userId : string = req.userId;

        firebase.admin.auth().getUser(userId).then((user) => {
            res.send(user);
        })
        .catch((error) => {
            res.status(404).send(error);
        });
    }

    static updateUser = async (req: Request, res: Response) => {
        var userId : string = req.body.userId;

        var email : string = req.body.email;
        var phoneNumber : string = req.body.phoneNumber;
        var firstName : string = req.body.firstName;
        var lastName : string = req.body.lastName;
        var password : string = req.body.password;
        var photoURL : string = req.body.photoURL;
        var updateObj : {
            email?: string,
            phoneNumber?: string,
            password?: string,
            displayName?: string,
            photoURL?: string
        } = {};

        var major : string = req.body.major;

        // Update major in cloud firestore collection
        if(typeof major !== "undefined"){
            try {
                await firebase.db.collection(config.USERS_COLLECTION).doc(userId).set({major});
            } catch(err){
                res.send(err);
                return;
            }
        }

        // Update authentication info, only update provided parameters
        if(typeof email !== "undefined"){
            updateObj["email"] = email;
        }
        if(typeof phoneNumber !== "undefined"){
            updateObj["phoneNumber"] = phoneNumber;
        }
        if(typeof password !== "undefined"){
            updateObj["password"] = password;
        }
        if(typeof firstName !== "undefined"){
            updateObj["displayName"] = firstName;
            if(typeof lastName !== "undefined"){
                updateObj["displayName"] = updateObj["displayName"] + " " + lastName;
            }
        }
        if(typeof photoURL !== "undefined"){
            updateObj["photoURL"] = photoURL;
        }

        try {
            var userRecord = await firebase.admin.auth().updateUser(userId, updateObj);
            res.send(userRecord.toJSON());
        } catch(err){
            res.send(err);
        }
    }

    // Tutor: Enlists the user as a tutor for the specified course
    static tutor = async (req: Request, res: Response) => {
        var userId : string = req.body.userId;

        var mandatoryParams = ["firstName", "lastName", "phoneNumber", ""]

        var firstName : string = req.body.firstName;
        var lastName : string = req.body.lastName;
        var phoneNum : string = req.body.phoneNum;
        var description : string = req.body.description;
        var isPublic : boolean = req.body.public;
        var coursesTutored : Array<string> = req.body.coursesTutored;
        var selectedFile : string = req.body.selectedFile;
        var selectedImg : string = req.body.selectedImg;
        var tutor : boolean = req.body.tutor;
        var email : string = req.body.email;

        const fields = {firstName, lastName, phoneNum, description, isPublic, coursesTutored, selectedFile, selectedImg, tutor, email}

        try {
            const updateRes = await firebase.db.collection("users").doc(userId).update(fields);
            res.send(updateRes);
        } catch(err){
            res.send(err);
        }
    }
}

export default UserController;
