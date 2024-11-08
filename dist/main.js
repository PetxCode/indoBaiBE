"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const mainError_1 = require("./error/mainError");
const handleError_1 = require("./error/handleError");
const enums_1 = require("./utils/enums");
const userRouter_1 = __importDefault(require("./router/userRouter"));
const propertyRouter_1 = __importDefault(require("./router/propertyRouter"));
const clientRouter_1 = __importDefault(require("./router/clientRouter"));
const mainApp = (app) => {
    try {
        app.use("/api", userRouter_1.default);
        app.use("/api", propertyRouter_1.default);
        app.use("/api", clientRouter_1.default);
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "Welcome to IndoBai API v1",
                });
            }
            catch (error) {
                res.status(404).json({
                    message: "Error loading",
                });
            }
        });
        app.all("*", (req, res, next) => {
            next(new mainError_1.mainError({
                name: `Route Error`,
                message: `Route Error: because the page, ${req.originalUrl} doesn't exist`,
                status: enums_1.HTTP.BAD_REQUEST,
                success: false,
            }));
        });
        app.use(handleError_1.handleError);
    }
    catch (error) {
        return error;
    }
};
exports.mainApp = mainApp;
