"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clientModel = new mongoose_1.Schema({
    agentID: {
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
    },
    propertyName: {
        type: String,
    },
    propertyID: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    preferredEmailContact: {
        type: Boolean,
        default: false,
    },
    preferredPhoneContact: {
        type: Boolean,
        default: false,
    },
    property: {
        type: mongoose_1.Types.ObjectId,
        ref: "properties",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("clients", clientModel);
