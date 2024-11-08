"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const propertyModel = new mongoose_1.Schema({
    propertyName: {
        type: String,
    },
    propertyCaptureTitle: {
        type: String,
    },
    mainDescription: {
        type: String,
    },
    firstDescription: {
        type: String,
    },
    gallaryDescription: {
        type: String,
    },
    closingDescription: {
        type: String,
    },
    closingTitle: {
        type: String,
    },
    bathroom: {
        type: String,
    },
    map: {
        type: String,
    },
    brochure: {
        type: String,
    },
    bedroom: {
        type: String,
    },
    startingPrice: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    location: {
        type: String,
    },
    region: {
        type: String,
    },
    community: {
        type: String,
    },
    measure: {
        type: String,
    },
    category: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    userID: {
        type: String,
    },
    gallaryImages: {
        type: [],
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "users",
    },
    client: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "clients",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("properties", propertyModel);
