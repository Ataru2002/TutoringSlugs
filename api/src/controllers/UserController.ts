import {Request, Response} from 'express';
import firebase from "../services/firebase";

class UserController {

    static getUserData = async (req: Request, res: Response) => {
        firebase.admin.auth().getUser(req.userId).then((user) => {
            res.send(user);
        })
        .catch((error) => {
            res.status(404).send(error);
        });
    }

    // Tutor: Enlists the user as a tutor for the specified course
    static tutor = async (req: Request, res: Response) => {
        var userId : string = req.body.userId;

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
