import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const schemaArticle = new Schema(
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
    images: {
      type: [
        {
          url: String,
          publicId: String,
        },
      ],
      default: [],
      required: true,
    },
    place: {
      type: String,
    },
    tags: {
      type: [],
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
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
schemaArticle.plugin(mongooseAggregatePaginate);

export const Article = mongoose.model("Article", schemaArticle);
