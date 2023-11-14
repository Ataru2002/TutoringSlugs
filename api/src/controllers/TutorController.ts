import { DocumentReference, DocumentSnapshot, DocumentData } from '@google-cloud/firestore';
import {Request, Response} from 'express';
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const db = getFirestore();

class TutorController {

    static list = async (req: Request, res: Response) => {
        var objs : Array<DocumentData | undefined> = [];

        try {
            var docs = await db.collection("users").listDocuments();

            for await(var doc of docs){
                var data = await doc.get();
                var obj = data.data();
                if("coursesTutoring" in obj && obj["coursesTutoring"].length > 0){
                    objs.push(data.data());
                }
            }
            res.send(objs);
        } catch(err){
            res.send(err);
        }
    }

}

export default TutorController;
