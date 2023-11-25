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
class AuthController {
}
_a = AuthController;
AuthController.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var mandatoryParams = ["userId", "firstName", "lastName", "email"];
    var missingParam = (0, util_1.checkMandatoryParams)(req.body, mandatoryParams);
    if (missingParam != null) {
        res.status(400).send({ message: "The " + missingParam + " parameter is missing. Mandatory params are: " + mandatoryParams });
        return;
    }
    var userId = req.body.userId;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var fields = { firstName, lastName, email };
    // Add user to the database
    try {
        const result = yield firebase_1.default.db.collection(config_1.default.USERS_COLLECTION).doc(userId).set(fields);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
});
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var mandatoryParams = ["userId", "firstName", "lastName", "email"];
    var missingParam = (0, util_1.checkMandatoryParams)(req.body, mandatoryParams);
    if (missingParam != null) {
        res.status(400).send({ message: "The " + missingParam + " parameter is missing. Mandatory params are: " + mandatoryParams });
        return;
    }
    // Firebase token
    var idToken = req.body.idToken;
    var userId = req.body.userId;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    // TODO: Change expires in
    var expiresIn = 60 * 1000 * 5;
    firebase_1.default.admin.auth().createSessionCookie(idToken, { expiresIn })
        .then(function (sessionCookie) {
        return __awaiter(this, void 0, void 0, function* () {
            // Add user to database if doesnt exist yet
            try {
                const usersRef = firebase_1.default.db.collection(config_1.default.USERS_COLLECTION).doc(userId);
                const doc = yield usersRef.get();
                // User doesn't exist, add to database
                if (!doc.exists) {
                    var fields = { firstName, lastName, email };
                    const result = yield firebase_1.default.db.collection(config_1.default.USERS_COLLECTION).doc(userId).set(fields);
                }
            }
            catch (err) {
                res.send(err);
                return;
            }
            const options = { maxAge: expiresIn, httpOnly: false, secure: false, sameSite: 'none' };
            res.cookie('session', sessionCookie, options);
            res.end(JSON.stringify({ status: "success" }));
        });
    }, (error) => {
        console.log(error);
        res.status(401).send("Unauthorized request.");
    });
});
AuthController.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("session");
    res.redirect("/signin");
});
exports.default = AuthController;
