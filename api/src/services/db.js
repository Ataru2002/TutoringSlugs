"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();
exports.default = db;
