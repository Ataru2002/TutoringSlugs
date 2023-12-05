"use strict";
// tutor.ts
// Handles tutor api routes and middlewares. Calls the tutor controller to handle logic.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TutorController_1 = __importDefault(require("../controllers/TutorController"));
var router = express_1.default.Router();
router.post("/list", TutorController_1.default.list);
exports.default = router;
