"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatar = exports.avatar = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            let folder = "./uploads/others";
            // if (file.fieldname === "gallaryImage") folder = "./uploads/photos";
            if (file.fieldname === "coverImage")
                folder = "./uploads/coverImages";
            else if (file.fieldname === "map")
                folder = "./uploads/maps";
            else if (file.fieldname === "brochure")
                folder = "./uploads/documents";
            else if (file.fieldname === "gallaryImage")
                folder = "./uploads/photos";
            cb(null, folder);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
        },
    }),
});
exports.avatar = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            let folder = "./uploads/others";
            if (file.fieldname === "gallaryImage")
                folder = "./uploads/photos";
            cb(null, folder);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
        },
    }),
});
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/avatar");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
    },
});
exports.uploadAvatar = (0, multer_1.default)({ storage: storage }).single("avatar");
