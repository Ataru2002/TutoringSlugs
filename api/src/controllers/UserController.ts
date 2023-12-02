import {Request, Response} from 'express';
import firebase from "../services/firebase";
import config from "../config/config";
import { checkMandatoryParams } from '../services/util';
import fs from "fs";

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
        console.log({userId, email, phoneNumber, firstName, lastName, password, photoURL});

        var collectionObj : {
            email? : string,
            major? : string,
            firstName? : string,
            lastName? : string
        } = {};

        // Update authentication info, only update provided parameters
        if(email != null && email.length > 0){
            updateObj["email"] = email;
            collectionObj["email"] = email;
        }
        if(phoneNumber != null && phoneNumber.length > 0){
            updateObj["phoneNumber"] = phoneNumber;
        }
        if(password != null && password.length > 0){
            updateObj["password"] = password;
        }
        if(firstName != null && firstName.length > 0){
            updateObj["displayName"] = firstName;
            collectionObj["firstName"] = firstName;
            if(lastName != null && lastName.length > 0){
                updateObj["displayName"] = updateObj["displayName"] + " " + lastName;
                collectionObj["lastName"] = lastName;
            }
        }
        if(photoURL != null && photoURL.length > 0){
            updateObj["photoURL"] = photoURL;
        }
        if(major != null && major.length > 0){
            collectionObj["major"] = major;
        }

        // Update major in cloud firestore collection
        try {
            await firebase.db.collection(config.USERS_COLLECTION).doc(userId).set(collectionObj, {merge: true});
        } catch(err){
            res.send(err);
            return;
        }

        // Nothing is being updated
        if(Object.keys(updateObj).length === 0){
            res.send({message: "Updating 0 items"});
            return;
        }

        try {
            var userRecord = await firebase.admin.auth().updateUser(userId, updateObj);
            res.send(userRecord.toJSON());
        } catch(err : any){
            console.log(err);
            res.status(409).end(err.message);
        }
    }

    // Tutor: Enlists the user as a tutor for the specified course
    static updateTutor = async (req: Request, res: Response) => {
        var userId : string = req.userId;

        var mandatoryParams = ["phoneNum", "coursesTutored", "isPublic", "tutor"];
        var missingParam = checkMandatoryParams(req.body, mandatoryParams);
        if(missingParam != null){
            res.status(400).send({message: "The " + missingParam + " parameter is missing. Mandatory params are: " + mandatoryParams});
            return;
        }

        var phoneNumber : string = req.body.phoneNum;
        var description : string = req.body.description;
        // Bruh
        var isPublic : boolean = req.body.public === "yes";
        var coursesTutored : Array<string> = req.body.coursesTutored;
        var selectedFile : string = req.body.selectedFile;
        var selectedImg : string = req.body.selectedImg;
        var tutor : boolean = req.body.tutor;

        var updateObj : {
            phoneNumber? : string,
            description? : string,
            isPublic? : boolean,
            coursesTutored? : Array<string>,
            selectedFile? : string,
            selectedImg? : string,
            tutor? : boolean,
        } = {};


        if(phoneNumber != null && phoneNumber.length > 0){
            updateObj["phoneNumber"] = phoneNumber;
        }
        if(isPublic != null){
            updateObj["isPublic"] = isPublic;
        }
        if(coursesTutored != null && coursesTutored.length > 0){
            updateObj["coursesTutored"] = coursesTutored;
        }
        if(tutor != null){
            updateObj["tutor"] = tutor;
        }
        if(description != null && description.length > 0){
            updateObj["description"] = description;
        }
        if(selectedFile != null && selectedFile.length > 0){
            updateObj["selectedFile"] = selectedFile;
        }
        if(selectedImg != null && selectedImg.length > 0){
            updateObj["selectedImg"] = selectedImg;
        }

        console.log(updateObj);

        try {
            const updateRes = await firebase.db.collection(config.USERS_COLLECTION).doc(userId).set(updateObj, {merge: true});
            res.send(updateRes);
        } catch(err){
            res.send(err);
        }
    }

    static uploadProfilePhoto = async (req: Request, res: Response) => {
        var fileName : string = req.userId + ".jpg";
        fs.writeFile("../src/assests/profiles/" + fileName, req.body, (err) => {
            if(err) throw err;
        })
        res.send({message: "Success.", fileName});
    };

    static uploadTranscript = async (req: Request, res: Response) => {
        var fileName : string = req.userId + ".pdf";
        console.log(req.body.type);
        fs.writeFile("../src/assests/transcripts/" + fileName, req.body, (err) => {
            if(err) throw err;
        })
        res.send({message: "Success.", fileName});
    }
}

export default UserController;
