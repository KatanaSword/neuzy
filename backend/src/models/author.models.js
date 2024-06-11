import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const schemaAuthor = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    avatar: {
      type: {
        url: String,
        publicId: String,
      },
      default: {
        url: "",
        publicId: "",
      },
    },
    socialLink: {
      type: [
        {
          facebook: String,
        },
        {
          instagram: String,
        },
        { x: String },
      ],
      default: [],
      trim: true,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

schemaAuthor.plugin(mongooseAggregatePaginate);

export const Author = mongoose.model("Author", schemaAuthor);
