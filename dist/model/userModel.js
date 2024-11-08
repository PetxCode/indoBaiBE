"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    location: {
        type: String,
    },
    bio: {
        type: String,
    },
    avatar: {
        type: String,
    },
    userName: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    verifyToken: {
        type: String,
    },
    userCode: {
        type: String,
    },
    isVerify: {
        type: Boolean,
        default: false,
    },
    client: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "clients",
        },
    ],
    properties: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "properties",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userModel);
