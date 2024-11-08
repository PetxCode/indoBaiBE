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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientInterestOnProperty = exports.clientPropertyInterest = exports.createClientPropertyInterest = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const propertyModel_1 = __importDefault(require("../model/propertyModel"));
const mongoose_1 = require("mongoose");
const clientModel_1 = __importDefault(require("../model/clientModel"));
const createClientPropertyInterest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { propertyID } = req.params;
        const { firstName, lastName, email, phoneNumber } = req.body;
        const findProperty = yield propertyModel_1.default.findById(propertyID);
        const user = yield userModel_1.default.findById(findProperty === null || findProperty === void 0 ? void 0 : findProperty.userID);
        if (findProperty) {
            const client = yield clientModel_1.default.create({
                firstName,
                lastName,
                email,
                phoneNumber,
                propertyID,
                agentID: user === null || user === void 0 ? void 0 : user._id,
                propertyName: findProperty === null || findProperty === void 0 ? void 0 : findProperty.propertyName,
            });
            (_a = findProperty === null || findProperty === void 0 ? void 0 : findProperty.client) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.Types.ObjectId(client === null || client === void 0 ? void 0 : client._id));
            findProperty === null || findProperty === void 0 ? void 0 : findProperty.save();
            (_b = user === null || user === void 0 ? void 0 : user.client) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.Types.ObjectId(client === null || client === void 0 ? void 0 : client._id));
            user === null || user === void 0 ? void 0 : user.save();
            return res.status(201).json({
                message: "client added to property successfully",
                data: client,
                status: 201,
            });
        }
        else {
            return res.status(404).json({ message: "Error" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.createClientPropertyInterest = createClientPropertyInterest;
const clientPropertyInterest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const client = yield userModel_1.default.findById(userID).populate({
                path: "client",
                options: {
                    sort: {
                        createdAt: -1,
                    },
                },
            });
            return res.status(201).json({
                message: "clients to property ",
                data: client,
                status: 201,
            });
        }
        else {
            return res.status(404).json({ message: "Error" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.clientPropertyInterest = clientPropertyInterest;
const clientInterestOnProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { propertyID } = req.params;
        const user = yield propertyModel_1.default.findById(propertyID);
        if (user) {
            const client = yield propertyModel_1.default.findById(propertyID).populate({
                path: "client",
                options: {
                    sort: {
                        createdAt: -1,
                    },
                },
            });
            return res.status(201).json({
                message: "clients to property ",
                data: client,
                status: 201,
            });
        }
        else {
            return res.status(404).json({ message: "Error" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.clientInterestOnProperty = clientInterestOnProperty;
