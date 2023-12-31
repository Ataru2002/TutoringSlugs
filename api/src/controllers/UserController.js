"use strict";
// UserController.ts
// Handles all user action api logic such as getting user data and updating user/tutor information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = __importDefault(require("../services/firebase"));
const config_1 = __importDefault(require("../config/config"));
const util_1 = require("../services/util");
const fs_1 = __importDefault(require("fs"));
class UserController {
}
_a = UserController;
UserController.getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var userId = req.userId;
    firebase_1.default.admin.auth().getUser(userId).then((user) => {
        res.send(user);
    })
        .catch((error) => {
        res.status(404).send(error);
    });
});
UserController.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var userId = req.userId;
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var password = req.body.password;
    var oldDisplayName = req.body.oldDisplayName;
    var updateObj = {};
    var major = req.body.major;
    console.log({ userId, email, firstName, lastName, password, oldDisplayName });
    var collectionObj = {};
    // Update authentication info, only update provided parameters 
    var oldFirstName = oldDisplayName.split(" ")[0];
    var oldLastName = oldDisplayName.split(" ")[1];
    if (firstName != null && firstName.length > 0) {
        updateObj["displayName"] = firstName;
        collectionObj["firstName"] = firstName;
    }
    else {
        updateObj["displayName"] = oldFirstName;
    }
    if (lastName != null && lastName.length > 0) {
        updateObj["displayName"] = updateObj["displayName"] + " " + lastName;
        collectionObj["lastName"] = lastName;
    }
    else {
        updateObj["displayName"] = updateObj["displayName"] + " " + oldLastName;
    }
    if (email != null && email.length > 0) {
        updateObj["email"] = email;
        collectionObj["email"] = email;
    }
    if (password != null && password.length > 0) {
        updateObj["password"] = password;
    }
    if (major != null && major.length > 0) {
        collectionObj["major"] = major;
    }
    // Update major in cloud firestore collection
    try {
        yield firebase_1.default.db.collection(config_1.default.USERS_COLLECTION).doc(userId).set(collectionObj, { merge: true });
    }
    catch (err) {
        res.send(err);
        return;
    }
    // Nothing is being updated
    if (Object.keys(updateObj).length === 0) {
        res.send({ message: "Updating 0 items" });
        return;
    }
    try {
        var userRecord = yield firebase_1.default.admin.auth().updateUser(userId, updateObj);
        res.send(userRecord.toJSON());
    }
    catch (err) {
        console.log(err);
        res.status(409).end(err.message);
    }
});
// Tutor: Enlists the user as a tutor for the specified course
UserController.updateTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var userId = req.userId;
    var mandatoryParams = ["coursesTutored", "tutor"];
    var missingParam = (0, util_1.checkMandatoryParams)(req.body, mandatoryParams);
    if (missingParam != null) {
        res.status(400).send({ message: "The " + missingParam + " parameter is missing. Mandatory params are: " + mandatoryParams });
        return;
    }
    var description = req.body.description;
    var coursesTutored = req.body.coursesTutored;
    var selectedFile = req.body.selectedFile;
    var selectedImg = req.body.selectedImg;
    var tutor = req.body.tutor;
    var updateObj = {};
    if (coursesTutored != null && coursesTutored.length > 0) {
        updateObj["coursesTutored"] = coursesTutored;
    }
    if (tutor != null) {
        updateObj["tutor"] = tutor;
    }
    if (description != null && description.length > 0) {
        updateObj["description"] = description;
    }
    if (selectedFile != null && selectedFile.length > 0) {
        updateObj["selectedFile"] = selectedFile;
    }
    if (selectedImg != null && selectedImg.length > 0) {
        updateObj["selectedImg"] = selectedImg;
    }
    console.log(updateObj);
    try {
        const updateRes = yield firebase_1.default.db.collection(config_1.default.USERS_COLLECTION).doc(userId).set(updateObj, { merge: true });
        res.send(updateRes);
    }
    catch (err) {
        res.send(err);
    }
});
UserController.uploadProfilePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var fileName = req.userId + ".jpg";
    fs_1.default.writeFile("../src/assests/profiles/" + fileName, req.body, (err) => {
        if (err)
            throw err;
    });
    res.send({ message: "Success.", fileName });
});
UserController.uploadTranscript = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var fileName = req.userId + ".pdf";
    fs_1.default.writeFile("../src/assests/transcripts/" + fileName, req.body, (err) => {
        if (err)
            throw err;
    });
    res.send({ message: "Success.", fileName });
});
exports.default = UserController;
