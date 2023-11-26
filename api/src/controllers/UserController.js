"use strict";
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
    var phoneNumber = req.body.phoneNumber;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var password = req.body.password;
    var photoURL = req.body.photoURL;
    var updateObj = {};
    var major = req.body.major;
    console.log({ userId, email, phoneNumber, firstName, lastName, password, photoURL });
    // Update major in cloud firestore collection
    if (major != null && major.length > 0) {
        try {
            yield firebase_1.default.db.collection(config_1.default.USERS_COLLECTION).doc(userId).set({ major });
        }
        catch (err) {
            res.send(err);
            return;
        }
    }
    // Update authentication info, only update provided parameters
    if (email != null && email.length > 0) {
        updateObj["email"] = email;
    }
    if (phoneNumber != null && phoneNumber.length > 0) {
        updateObj["phoneNumber"] = phoneNumber;
    }
    if (password != null && password.length > 0) {
        updateObj["password"] = password;
    }
    if (firstName != null && firstName.length > 0) {
        updateObj["displayName"] = firstName;
        if (lastName != null && lastName.length > 0) {
            updateObj["displayName"] = updateObj["displayName"] + " " + lastName;
        }
    }
    if (photoURL != null && photoURL.length > 0) {
        updateObj["photoURL"] = photoURL;
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
        res.send(err);
    }
});
// Tutor: Enlists the user as a tutor for the specified course
UserController.tutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var userId = req.userId;
    var mandatoryParams = ["phoneNum", "coursesTutored", "isPublic", "tutor"];
    var missingParam = (0, util_1.checkMandatoryParams)(req.body, mandatoryParams);
    if (missingParam != null) {
        res.status(400).send({ message: "The " + missingParam + " parameter is missing. Mandatory params are: " + mandatoryParams });
        return;
    }
    var phoneNumber = req.body.phoneNum;
    var description = req.body.description;
    // Bruh
    var isPublic = req.body.public === "yes";
    var coursesTutored = req.body.coursesTutored;
    var selectedFile = req.body.selectedFile;
    var selectedImg = req.body.selectedImg;
    var tutor = req.body.tutor;
    var updateObj = {};
    updateObj["phoneNumber"] = phoneNumber;
    updateObj["isPublic"] = isPublic;
    updateObj["coursesTutored"] = coursesTutored;
    updateObj["tutor"] = tutor;
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
        const docRef = firebase_1.default.db.collection(config_1.default.USERS_COLLECTION).doc(userId);
        const updateRes = yield docRef.set(updateObj);
        res.send(updateRes);
    }
    catch (err) {
        res.send(err);
    }
});
exports.default = UserController;
