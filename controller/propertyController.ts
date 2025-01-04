import { Request, Response } from "express";
import propertyModel from "../model/propertyModel";
import userModel from "../model/userModel";
import { streamUpload } from "../utils/streamifier";
import { Types } from "mongoose";
import cloudinary from "../utils/cloudinary";
import fs from "node:fs";
import path from "node:path";

export const createProperty = async (req: any, res: Response) => {
  try {
    const {
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
      measure,
      region,
      community,
    } = req.body;

    const { userID } = req.params;

    const getUser = await userModel.findById(userID);

    if (getUser) {
      //   const { secure_url }: any = await streamUpload(req.file);

      let cover = req.files["coverImage"] ? req.files["coverImage"][0] : null;

      let mapFile = req.files["map"] ? req.files["map"][0] : null;

      let brochureFile = req.files["brochure"]
        ? req.files["brochure"][0]
        : null;

      let gallary: any = [];

      let gallaryImages: any = req.files.gallaryImage;

      const { secure_url } = await cloudinary.uploader.upload(cover.path);

      const { secure_url: map } = await cloudinary.uploader.upload(
        mapFile.path
      );

      const { secure_url: brochure } = await cloudinary.uploader.upload(
        brochureFile.path
      );

      for (let i of gallaryImages) {
        const { secure_url }: any = await cloudinary.uploader.upload(i.path!);

        gallary.push(secure_url);
      }

      let fileDoc = path.join(__dirname, "../uploads/documents");
      let fileCov = path.join(__dirname, "../uploads/coverImages");
      let fileMap = path.join(__dirname, "../uploads/maps");
      let fileOthers = path.join(__dirname, "../uploads/others");
      let filePho = path.join(__dirname, "../uploads/photos");

      let fileMedia = path.join(__dirname, "../utils/uploads/media");

      const deleteFilesInFolder = (folderPath: any) => {
        if (fs.existsSync(folderPath)) {
          const files = fs.readdirSync(folderPath);

          files.forEach((file) => {
            const filePath = path.join(folderPath, file);
            fs.unlinkSync(filePath);
          });

          return;
        } else {
          return;
        }
      };

      deleteFilesInFolder;

      const property: any = await propertyModel.create({
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

      getUser.properties.push(new Types.ObjectId(property?._id));
      getUser.save();

      deleteFilesInFolder(fileDoc);
      deleteFilesInFolder(fileMap);
      deleteFilesInFolder(fileOthers);
      deleteFilesInFolder(fileCov);
      deleteFilesInFolder(filePho);

      deleteFilesInFolder(fileMedia);

      return res.status(201).json({
        message: "created successfully",
        data: property,
        status: 201,
      });
    } else {
      return res.status(404).json({ message: "Error" });
    }
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const property = await propertyModel.find();

    return res
      .status(201)
      .json({ message: "found successfully", data: property, status: 200 });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const getAllPropertiesByCommuninty = async (
  req: Request,
  res: Response
) => {
  try {
    const { community } = req.body;
    const property = await propertyModel.find({ community });

    return res
      .status(201)
      .json({ message: "found successfully", data: property, status: 200 });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const searchAllPropertiesByCommuninty = async (
  req: Request,
  res: Response
) => {
  try {
    const { country, category, bedroom, bathroom, minPrice, maxPrice } =
      req.body;
    const property = await propertyModel.find({
      country,
      category,
      bedroom,
      bathroom,
      startingPrice: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) },
    });

    return res
      .status(201)
      .json({ message: "found successfully", data: property, status: 200 });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const getOneProperties = async (req: Request, res: Response) => {
  try {
    const { propertyID } = req.params;
    const property = await propertyModel.findById(propertyID);

    return res
      .status(201)
      .json({ message: "found successfully", data: property, status: 200 });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const getAgentProperties = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const property = await userModel.findById(userID).populate({
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
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const updatePropertyPrice = async (req: Request, res: Response) => {
  try {
    const { userID, propertyID } = req.params;
    const { startingPrice } = req.body;
    const user = await userModel.findById(userID);

    if (user) {
      const price = await propertyModel.findByIdAndUpdate(
        propertyID,
        {
          startingPrice,
        },
        { new: true }
      );
      return res.status(201).json({
        message: "price updated successfully",
        data: price,
        status: 200,
      });
    } else {
      return res.status(404).json({ message: "Error" });
    }
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { userID, propertyID } = req.params;

    const user: any = await userModel.findById(userID);

    if (user) {
      await propertyModel.findByIdAndDelete(propertyID);

      user?.properties?.pull(new Types.ObjectId(propertyID));
      user?.save();

      return res.status(201).json({
        message: "property delete successfully",

        status: 201,
      });
    } else {
      return res.status(404).json({ message: "Error" });
    }
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};
