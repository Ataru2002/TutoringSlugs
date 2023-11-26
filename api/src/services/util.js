"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMandatoryParams = void 0;
const checkMandatoryParams = (obj, params) => {
    for (var i of params) {
        if (!(i in obj) || obj[i] == null)
            return i;
    }
    return null;
};
exports.checkMandatoryParams = checkMandatoryParams;
