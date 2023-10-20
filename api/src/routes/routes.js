"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
function use(app) {
    app.use("/course", require('./course'));
}
exports.use = use;
