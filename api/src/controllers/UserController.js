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
    var userId = req.body.userId;
    var email = req.body.email;
    var phoneNumber = req.body.phoneNumber;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var password = req.body.password;
    var photoURL = req.body.photoURL;
    var updateObj = {};
    var major = req.body.major;
    // Update major in cloud firestore collection
    if (typeof major !== "undefined") {
        try {
            yield firebase_1.default.db.collection(config_1.default.USERS_COLLECTION).doc(userId).set({ major });
        }
        catch (err) {
            res.send(err);
            return;
        }
    }
    // Update authentication info, only update provided parameters
    if (typeof email !== "undefined") {
        updateObj["email"] = email;
    }
    if (typeof phoneNumber !== "undefined") {
        updateObj["phoneNumber"] = phoneNumber;
    }
    if (typeof password !== "undefined") {
        updateObj["password"] = password;
    }
    if (typeof firstName !== "undefined") {
        updateObj["displayName"] = firstName;
        if (typeof lastName !== "undefined") {
            updateObj["displayName"] = updateObj["displayName"] + " " + lastName;
        }
    }
    if (typeof photoURL !== "undefined") {
        updateObj["photoURL"] = photoURL;
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
    var userId = req.body.userId;
    var mandatoryParams = ["firstName", "lastName", "phoneNumber", ""];
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phoneNum = req.body.phoneNum;
    var description = req.body.description;
    var isPublic = req.body.public;
    var coursesTutored = req.body.coursesTutored;
    var selectedFile = req.body.selectedFile;
    var selectedImg = req.body.selectedImg;
    var tutor = req.body.tutor;
    var email = req.body.email;
    const fields = { firstName, lastName, phoneNum, description, isPublic, coursesTutored, selectedFile, selectedImg, tutor, email };
    try {
        const updateRes = yield firebase_1.default.db.collection("users").doc(userId).update(fields);
        res.send(updateRes);
    }
    catch (err) {
        res.send(err);
    }
});
exports.default = UserController;
