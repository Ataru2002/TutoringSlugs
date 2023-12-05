// TutorController.ts
// Handles all tutor action api logic such as listing all tutors.

import { DocumentData } from '@google-cloud/firestore';
import {Request, Response} from 'express';
import config from "../config/config";
import firebase from '../services/firebase';

class TutorController {

    static list = async (req: Request, res: Response) => {
        var objs : Array<DocumentData | undefined> = [];

        try {
            var docs = await firebase.db.collection(config.USERS_COLLECTION).listDocuments();

            for await(var doc of docs){
                var data = await doc.get();
                let obj = data.data();
                var userId = doc.id;
                if("tutor" in obj && obj["tutor"]){
                    // Get user info
                    const userRecord = await firebase.admin.auth().getUser(userId);
                    var userInfo : {[key: string]: any} = userRecord.toJSON();

                    obj.displayName = userInfo.displayName;
                    obj.email = userInfo.email;
                    obj.photoURL = userInfo.photoURL;
                    objs.push({
                        [userId]: obj
                    });
                }
            }
            res.send(objs);
        } catch(err){
            res.send(err);
        }
    }

}

export default TutorController;
