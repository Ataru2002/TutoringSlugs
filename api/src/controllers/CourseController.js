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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
var course_list = [];
class CourseController {
}
_a = CourseController;
// Get: get singular course info, thiss will be called on the course page, has list of users etc
CourseController.get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.query.id;
    var found = false;
    if (typeof id !== "undefined") {
        fs.readFile("./src/test_data/all_classes.json", "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            var courses = JSON.parse(data);
            for (var department of courses) {
                if (id in department["classes"]) {
                    res.send({ courseId: id, link: department["classes"][id] });
                    found = true;
                }
            }
            if (!found)
                res.status(404).send("Course not found");
        });
    }
    else {
        res.status(400).send("No course id provided");
    }
});
// List: Ideally we would paginate this data so we don't return a giant object
// Have optional department query to filter results.
CourseController.list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    fs.readFile("./src/test_data/all_classes.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        var courses = JSON.parse(data);
        for (var department of courses) {
            course_list = course_list.concat(Object.keys(department["classes"]));
        }
        res.send(course_list);
    });
});
exports.default = CourseController;
