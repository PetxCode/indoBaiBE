"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = require("../controller/clientController");
const router = (0, express_1.Router)();
router
    .route("/client-interest-property/:propertyID")
    .post(clientController_1.createClientPropertyInterest);
router.route("/user-client-interest/:userID").get(clientController_1.clientPropertyInterest);
router
    .route("/property-client-interest/:propertyID")
    .get(clientController_1.clientInterestOnProperty);
exports.default = router;
