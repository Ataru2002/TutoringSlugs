"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const verifyCookie_1 = require("../middlewares/verifyCookie");
var router = express_1.default.Router();
router.post("/signup", AuthController_1.default.signup);
router.post("/login", AuthController_1.default.login);
router.post("/logout", [verifyCookie_1.verifyCookie], AuthController_1.default.logout);
exports.default = router;
