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
AuthController.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Firebase token
    var idToken = req.body.idToken;
    console.log("idtoken: ", idToken);
    var expiresIn = 60 * 1000 * 5;
    admin.auth().createSessionCookie(idToken, { expiresIn })
        .then((sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: false, secure: false, sameSite: 'none' };
        res.cookie('session', sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
    }, (error) => {
        console.log(error);
        res.status(401).send("Unauthorized request.");
    });
});
AuthController.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
AuthController.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("logged out");
});
exports.default = AuthController;
