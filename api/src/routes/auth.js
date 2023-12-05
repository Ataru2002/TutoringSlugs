"use strict";
// auth.ts
// Handles authentication api routes and middlewares. Calls the authentication controller to handle logic.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
var router = express_1.default.Router();
router.post("/signup", AuthController_1.default.signup);
router.post("/login", AuthController_1.default.login);
exports.default = router;
