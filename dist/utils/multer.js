"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatar = exports.avatar = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
let filePathMedia = node_path_1.default.join(__dirname, "./uploads/media");
let filePath = node_path_1.default.join(__dirname, "./uploads");
let filePathCoverImage = node_path_1.default.join(__dirname, "./uploads/coverImages");
let filePathMap = node_path_1.default.join(__dirname, "./uploads/maps");
let filePathDocuments = node_path_1.default.join(__dirname, "./uploads/documents");
let filePathPhotos = node_path_1.default.join(__dirname, "./uploads/photos");
let filePathOthers = node_path_1.default.join(__dirname, "./uploads/others");
const createFolder = (filePathFolder) => {
    console.log("Read Here");
    if (!node_fs_1.default.existsSync(filePathFolder)) {
        node_fs_1.default.mkdir(filePathFolder, () => {
            console.log("folder just created");
        });
    }
    else {
        console.log("folder exist...");
    }
};
createFolder(filePathMedia);
createFolder(filePathOthers);
createFolder(filePath);
createFolder(filePathCoverImage);
createFolder(filePathMap);
createFolder(filePathDocuments);
createFolder(filePathPhotos);
console.log("Read Here");
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            let folder = "./uploads/media";
            if (file.fieldname === "coverImage")
                folder = filePathMedia;
            else if (file.fieldname === "map")
                folder = filePathMedia;
            else if (file.fieldname === "brochure")
                folder = filePathMedia;
            else if (file.fieldname === "gallaryImage")
                folder = filePathMedia;
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
        cb(null, filePathMedia);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
    },
});
exports.uploadAvatar = (0, multer_1.default)({ storage: storage }).single("avatar");
// if (file.fieldname === "gallaryImage") folder = "./uploads/photos";
// if (file.fieldname === "coverImage") folder = "./uploads/coverImages";
// else if (file.fieldname === "map") folder = "./uploads/maps";
// else if (file.fieldname === "brochure") folder = "./uploads/documents";
// else if (file.fieldname === "gallaryImage") folder = "./uploads/photos";
