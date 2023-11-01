"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const checkjwt_1 = require("../middlewares/checkjwt");
var router = express_1.default.Router();
router.post("/login", AuthController_1.default.login);
router.post("/logout", [checkjwt_1.checkJwt], AuthController_1.default.logout);
exports.default = router;
