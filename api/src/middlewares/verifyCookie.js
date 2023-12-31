"use strict";
// verifyCookie.ts
// Middleware to verify a user session cookie. Required for all authenticated apis and keeps a user signed in across pages of the website.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCookie = void 0;
const admin = __importStar(require("firebase-admin"));
const verifyCookie = (req, res, next) => {
    const sessionCookie = req.cookies.session || '';
    console.log(sessionCookie);
    admin.auth().verifySessionCookie(sessionCookie, true)
        .then((decodedClaims) => {
        console.log("decoded claims: ", decodedClaims);
        req.userId = decodedClaims.user_id;
        next();
    })
        .catch((error) => {
        res.status(404).send(error);
    });
};
exports.verifyCookie = verifyCookie;
