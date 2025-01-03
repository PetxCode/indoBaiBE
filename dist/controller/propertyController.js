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
exports.deleteProperty = exports.updatePropertyPrice = exports.getAgentProperties = exports.getOneProperties = exports.searchAllPropertiesByCommuninty = exports.getAllPropertiesByCommuninty = exports.getAllProperties = exports.createProperty = void 0;
const propertyModel_1 = __importDefault(require("../model/propertyModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const mongoose_1 = require("mongoose");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const createProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { propertyName, propertyCaptureTitle, mainDescription, firstDescription, gallaryDescription, closingDescription, closingTitle, bathroom, bedroom, startingPrice, city, country, location, category, measure, region, community, } = req.body;
        const { userID } = req.params;
        const getUser = yield userModel_1.default.findById(userID);
        if (getUser) {
            //   const { secure_url }: any = await streamUpload(req.file);
            let cover = req.files["coverImage"] ? req.files["coverImage"][0] : null;
            let mapFile = req.files["map"] ? req.files["map"][0] : null;
            let brochureFile = req.files["brochure"]
                ? req.files["brochure"][0]
                : null;
            let gallary = [];
            let gallaryImages = req.files.gallaryImage;
            const { secure_url } = yield cloudinary_1.default.uploader.upload(cover.path);
            const { secure_url: map } = yield cloudinary_1.default.uploader.upload(mapFile.path);
            const { secure_url: brochure } = yield cloudinary_1.default.uploader.upload(brochureFile.path);
            for (let i of gallaryImages) {
                const { secure_url } = yield cloudinary_1.default.uploader.upload(i.path);
                gallary.push(secure_url);
            }
            let fileDoc = node_path_1.default.join(__dirname, "../uploads/documents");
            let fileCov = node_path_1.default.join(__dirname, "../uploads/coverImages");
            let fileMap = node_path_1.default.join(__dirname, "../uploads/maps");
            let fileOthers = node_path_1.default.join(__dirname, "../uploads/others");
            let filePho = node_path_1.default.join(__dirname, "../uploads/photos");
            const deleteFilesInFolder = (folderPath) => {
                if (node_fs_1.default.existsSync(folderPath)) {
                    const files = node_fs_1.default.readdirSync(folderPath);
                    files.forEach((file) => {
                        const filePath = node_path_1.default.join(folderPath, file);
                        node_fs_1.default.unlinkSync(filePath);
                    });
                    return;
                }
                else {
                    return;
                }
            };
            deleteFilesInFolder;
            const property = yield propertyModel_1.default.create({
                region,
                community,
                userID,
                propertyName,
                propertyCaptureTitle,
                mainDescription,
                firstDescription,
                gallaryDescription,
                closingDescription,
                closingTitle,
                bathroom,
                bedroom,
                startingPrice,
                city,
                country,
                location,
                category,
                coverImage: secure_url,
                map,
                brochure,
                measure,
                gallaryImages: gallary,
            });
            getUser.properties.push(new mongoose_1.Types.ObjectId(property === null || property === void 0 ? void 0 : property._id));
            getUser.save();
            deleteFilesInFolder(fileDoc);
            deleteFilesInFolder(fileMap);
            deleteFilesInFolder(fileOthers);
            deleteFilesInFolder(fileCov);
            deleteFilesInFolder(filePho);
            return res.status(201).json({
                message: "created successfully",
                data: property,
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
exports.createProperty = createProperty;
const getAllProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property = yield propertyModel_1.default.find();
        return res
            .status(201)
            .json({ message: "found successfully", data: property, status: 200 });
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.getAllProperties = getAllProperties;
const getAllPropertiesByCommuninty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { community } = req.body;
        const property = yield propertyModel_1.default.find({ community });
        return res
            .status(201)
            .json({ message: "found successfully", data: property, status: 200 });
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.getAllPropertiesByCommuninty = getAllPropertiesByCommuninty;
const searchAllPropertiesByCommuninty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { country, category, bedroom, bathroom, minPrice, maxPrice } = req.body;
        const property = yield propertyModel_1.default.find({
            country,
            category,
            bedroom,
            bathroom,
            startingPrice: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) },
        });
        return res
            .status(201)
            .json({ message: "found successfully", data: property, status: 200 });
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.searchAllPropertiesByCommuninty = searchAllPropertiesByCommuninty;
const getOneProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { propertyID } = req.params;
        const property = yield propertyModel_1.default.findById(propertyID);
        return res
            .status(201)
            .json({ message: "found successfully", data: property, status: 200 });
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.getOneProperties = getOneProperties;
const getAgentProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const property = yield userModel_1.default.findById(userID).populate({
            path: "properties",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        return res
            .status(201)
            .json({ message: "found successfully", data: property, status: 200 });
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.getAgentProperties = getAgentProperties;
const updatePropertyPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, propertyID } = req.params;
        const { startingPrice } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const price = yield propertyModel_1.default.findByIdAndUpdate(propertyID, {
                startingPrice,
            }, { new: true });
            return res.status(201).json({
                message: "price updated successfully",
                data: price,
                status: 200,
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
exports.updatePropertyPrice = updatePropertyPrice;
const deleteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userID, propertyID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            yield propertyModel_1.default.findByIdAndDelete(propertyID);
            (_a = user === null || user === void 0 ? void 0 : user.properties) === null || _a === void 0 ? void 0 : _a.pull(new mongoose_1.Types.ObjectId(propertyID));
            user === null || user === void 0 ? void 0 : user.save();
            return res.status(201).json({
                message: "property delete successfully",
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
exports.deleteProperty = deleteProperty;
