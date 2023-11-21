"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const verifyCookie_1 = require("../middlewares/verifyCookie");
const app = (0, express_1.default)();
var router = express_1.default.Router();
router.get("/", [verifyCookie_1.verifyCookie], UserController_1.default.getUserData);
exports.default = router;
