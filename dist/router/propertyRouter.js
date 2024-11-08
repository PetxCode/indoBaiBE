"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const propertyController_1 = require("../controller/propertyController");
const multer_1 = __importDefault(require("multer"));
const multer_2 = require("../utils/multer");
let coverImage = (0, multer_1.default)().single("coverImage");
const router = (0, express_1.Router)();
router
    .route("/read-all-property-community/")
    .post(propertyController_1.getAllPropertiesByCommuninty);
router
    .route("/read-all-property-search/")
    .post(propertyController_1.searchAllPropertiesByCommuninty);
router.route("/read-all-property/").get(propertyController_1.getAllProperties);
router.route("/read-my-property/:userID").get(propertyController_1.getAgentProperties);
router.route("/read-one-property/:propertyID").get(propertyController_1.getOneProperties);
router
    .route("/update-my-property/:userID/:propertyID")
    .patch(propertyController_1.updatePropertyPrice);
router.route("/delete-my-property/:userID/:propertyID").delete(propertyController_1.deleteProperty);
router.route("/create-property/:userID").post(multer_2.upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "map", maxCount: 1 },
    { name: "brochure", maxCount: 1 },
    { name: "gallaryImage", maxCount: 4 },
]), propertyController_1.createProperty);
exports.default = router;
