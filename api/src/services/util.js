"use strict";
// util.ts
// Any utility functions go here. Currently just a helper function to check that all mandatory parameters are provided in an api request.
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
