"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const config_1 = __importDefault(require("../config/config"));
const jwt = __importStar(require("jsonwebtoken"));
const admin = __importStar(require("firebase-admin"));
const serviceAccountKey_json_1 = __importDefault(require("../../serviceAccountKey.json"));
const { Firestore } = require("@google-cloud/firestore");
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey_json_1.default)
});
const db = getFirestore();
class AuthController {
}
_a = AuthController;
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Firebase token
    var firebaseToken = req.body.token;
    console.log("firebase token: " + firebaseToken);
    admin.auth().verifyIdToken(firebaseToken).then(function (decodedToken) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("decoded token: ", decodedToken);
            var userId = decodedToken.uid;
            // Sign JWT valid for 1 hour
            const token = jwt.sign({ userId }, config_1.default.jwtSecret, { expiresIn: "1h" });
            try {
                const docRef = db.collection("users").doc("hello");
                yield docRef.set({
                    email: decodedToken.email,
                    name: decodedToken.name
                });
                console.log('Entered new data into the document');
            }
            catch (err) {
                console.log(err);
            }
            res.send(token);
        });
    }).catch((err) => {
        //console.error(err);
        res.send(err);
    });
});
AuthController.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
AuthController.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("logged out");
});
exports.default = AuthController;
