import mongoose, { Schema } from "mongoose";
import { availableUserSubscription, userSubscription } from "../constants.js";

const schemaSubscription = Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plain: {
      type: String,
      enum: availableUserSubscription,
      default: userSubscription.FREE,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", schemaSubscription);
