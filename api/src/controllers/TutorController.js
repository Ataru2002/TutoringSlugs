"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const firebase_1 = __importDefault(require("../services/firebase"));
class TutorController {
}
_a = TutorController;
TutorController.list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, e_1, _c, _d;
    var objs = [];
    try {
        var docs = yield firebase_1.default.db.collection(config_1.default.USERS_COLLECTION).listDocuments();
        try {
            for (var _e = true, docs_1 = __asyncValues(docs), docs_1_1; docs_1_1 = yield docs_1.next(), _b = docs_1_1.done, !_b; _e = true) {
                _d = docs_1_1.value;
                _e = false;
                var doc = _d;
                var data = yield doc.get();
                let obj = data.data();
                var userId = doc.id;
                if ("tutor" in obj && obj["tutor"]) {
                    // Get user info
                    const userRecord = yield firebase_1.default.admin.auth().getUser(userId);
                    var userInfo = userRecord.toJSON();
                    obj.displayName = userInfo.displayName;
                    obj.email = userInfo.email;
                    obj.photoURL = userInfo.photoURL;
                    objs.push({
                        [userId]: obj
                    });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_e && !_b && (_c = docs_1.return)) yield _c.call(docs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        res.send(objs);
    }
    catch (err) {
        res.send(err);
    }
});
exports.default = TutorController;
