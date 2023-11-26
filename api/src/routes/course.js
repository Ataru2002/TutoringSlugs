"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CourseController_1 = __importDefault(require("../controllers/CourseController"));
const app = (0, express_1.default)();
var router = express_1.default.Router();
router.get("/get", CourseController_1.default.get);
router.get("/list", CourseController_1.default.list);
exports.default = router;
