import * as admin from "firebase-admin";
import serviceAccountKey from "../../serviceAccountKey.json";

const { getFirestore } = require('firebase-admin/firestore');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount)
});
const db = getFirestore();

export default {
    admin, db
};