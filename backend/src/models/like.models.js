import mongoose, { Schema } from "mongoose";

const schemaLike = new Schema(
  {
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", schemaLike);
