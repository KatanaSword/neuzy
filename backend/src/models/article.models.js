import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { article, availableArticle } from "../constants.js";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: {
        url: String,
        publicId: String,
      },
      default: {
        url: "",
        publicId: "",
      },
      required: true,
    },
    place: {
      type: String,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    articleAccess: {
      type: String,
      enum: availableArticle,
      default: article.FREE,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);
articleSchema.plugin(mongooseAggregatePaginate);

export const Article = mongoose.model("Article", articleSchema);
