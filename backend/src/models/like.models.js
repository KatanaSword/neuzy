import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    articleId: {
      type: Schema.Types.ObjectId,
      ref: "Article",
      default: null,
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
