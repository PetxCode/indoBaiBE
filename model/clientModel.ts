import { model, Schema, Types } from "mongoose";
import { iClientData } from "../utils/interfaces";

const clientModel = new Schema<iClientData>(
  {
    agentID: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    propertyName: {
      type: String,
    },
    propertyID: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    preferredEmailContact: {
      type: Boolean,
      default: false,
    },

    preferredPhoneContact: {
      type: Boolean,
      default: false,
    },

    property: {
      type: Types.ObjectId,
      ref: "properties",
    },
  },
  { timestamps: true }
);

export default model<iClientData>("clients", clientModel);
