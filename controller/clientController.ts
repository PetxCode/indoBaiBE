import { Request, Response } from "express";
import userModel from "../model/userModel";
import propertyModel from "../model/propertyModel";
import { Types } from "mongoose";
import clientModel from "../model/clientModel";

export const createClientPropertyInterest = async (
  req: Request,
  res: Response
) => {
  try {
    const { propertyID } = req.params;
    const { firstName, lastName, email, phoneNumber } = req.body;

    const findProperty: any = await propertyModel.findById(propertyID);
    const user: any = await userModel.findById(findProperty?.userID);

    if (findProperty) {
      const client: any = await clientModel.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        propertyID,
        agentID: user?._id,
        propertyName: findProperty?.propertyName,
      });

      findProperty?.client?.push(new Types.ObjectId(client?._id!));
      findProperty?.save();

      user?.client?.push(new Types.ObjectId(client?._id!));
      user?.save();

      return res.status(201).json({
        message: "client added to property successfully",
        data: client,
        status: 201,
      });
    } else {
      return res.status(404).json({ message: "Error" });
    }
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const clientPropertyInterest = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user: any = await userModel.findById(userID);

    if (user) {
      const client: any = await userModel.findById(userID).populate({
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
    } else {
      return res.status(404).json({ message: "Error" });
    }
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const clientInterestOnProperty = async (req: Request, res: Response) => {
  try {
    const { propertyID } = req.params;

    const user: any = await propertyModel.findById(propertyID);

    if (user) {
      const client: any = await propertyModel.findById(propertyID).populate({
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
    } else {
      return res.status(404).json({ message: "Error" });
    }
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};
