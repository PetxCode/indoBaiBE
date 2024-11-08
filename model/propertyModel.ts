import { model, Schema, Types } from "mongoose";
import { iPropertyData } from "../utils/interfaces";

const propertyModel = new Schema<iPropertyData>(
  {
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
      type: Types.ObjectId,
      ref: "users",
    },

    client: [
      {
        type: Types.ObjectId,
        ref: "clients",
      },
    ],
  },
  { timestamps: true }
);

export default model<iPropertyData>("properties", propertyModel);
