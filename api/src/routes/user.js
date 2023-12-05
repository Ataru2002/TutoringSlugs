"use strict";
// user.ts
// Handles user api routes and middlewares. Calls the user controller to handle logic.
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
router.post("/updateTutor", [verifyCookie_1.verifyCookie], UserController_1.default.updateTutor);
router.post("/updateUser", [verifyCookie_1.verifyCookie], UserController_1.default.updateUser);
router.post("/uploadProfilePhoto", [verifyCookie_1.verifyCookie, express_1.default.raw({ inflate: true, limit: '50mb', type: () => true })], UserController_1.default.uploadProfilePhoto);
router.post("/uploadTranscript", [verifyCookie_1.verifyCookie, express_1.default.raw({ inflate: true, limit: '50mb', type: "pdf" })], UserController_1.default.uploadTranscript);
exports.default = router;
