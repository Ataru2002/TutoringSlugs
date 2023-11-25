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
        var userId : string = req.userId;

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
        if(major != null && major.length > 0){
            try {
                await firebase.db.collection(config.USERS_COLLECTION).doc(userId).set({major});
            } catch(err){
                res.send(err);
                return;
            }
        }

        // Update authentication info, only update provided parameters
        if(email != null && email.length > 0){
            updateObj["email"] = email;
        }
        if(phoneNumber != null && phoneNumber.length > 0){
            updateObj["phoneNumber"] = phoneNumber;
        }
        if(password != null && password.length > 0){
            updateObj["password"] = password;
        }
        if(firstName != null && firstName.length > 0){
            updateObj["displayName"] = firstName;
            if(lastName != null && lastName.length > 0){
                updateObj["displayName"] = updateObj["displayName"] + " " + lastName;
            }
        }
        if(photoURL != null && photoURL.length > 0){
            updateObj["photoURL"] = photoURL;
        }

        // Nothing is being updated
        if(Object.keys(updateObj).length === 0){
            res.send({message: "Updating 0 items"});
            return;
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
