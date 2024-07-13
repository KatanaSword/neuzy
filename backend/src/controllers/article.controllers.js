import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Article } from "../models/article.models.js";
import { Category } from "../models/category.models.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { getMongoosePaginationOptions } from "../utils/helpers.js";
import { article } from "../constants.js";
import mongoose from "mongoose";

const getAllArticles = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const aggregateArticles = await Article.aggregate([{ $match: {} }]);
  if (aggregateArticles.length < 1) {
    throw new ApiError(404, "Articles does not exists");
  }

  const articles = await Article.aggregatePaginate(
    aggregateArticles,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: { totalDocs: "totalArticles", docs: "articles" },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, articles, "Articles retrieved successfully"));
});

const createArticles = asyncHandler(async (req, res) => {
  const { title, content, place, category, articleAccess } = req.body;
  if ([title, content, place, category].some((field) => field?.trim() === "")) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to create article"
    );
  }

  const categoryToBeAdded = await Category.findOne({
    name: category?.trim().toLowerCase(),
  });
  if (!categoryToBeAdded) {
    throw new ApiError(404, "Category does not exists");
  }

  const localFilePath = req.file.path;
  if (!localFilePath) {
    throw new ApiError(400, "Image is missing");
  }

  const image = await uploadOnCloudinary(localFilePath, "Neuzy/articles");
  if (!image) {
    throw new ApiError(
      400,
      "Failed to upload image. Please ensure the file format is supported"
    );
  }

  const createArticles = await Article.create({
    title,
    content,
    place,
    image: {
      url: image.url,
      publicId: image.public_id,
    },
    articleAccess: articleAccess || article.FREE,
    category: categoryToBeAdded._id,
    author: req.user?._id,
  });
  if (!createArticles) {
    throw new ApiError(
      500,
      "Failed to create article due to an unexpected server error. Please try again later"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { articles: createArticles },
        "Article create successfully"
      )
    );
});

const getArticleById = asyncHandler(async (req, res) => {
  const { articleId } = req.params;

  const article = await Article.findOne({ _id: articleId });
  if (!article) {
    throw new ApiError(404, "Article does not exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, article, "Article fetch successfully"));
});

const getArticleByCategory = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category does not exists");
  }

  const articleAggregate = await Article.aggregate([
    { $match: { category: new mongoose.Types.ObjectId(categoryId) } },
  ]);
  if (articleAggregate.length < 1) {
    throw new ApiError(404, "Article does not exists");
  }

  const articles = await Article.aggregatePaginate(
    articleAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalArticles",
        docs: "articles",
      },
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { ...articles, category },
        "Category articles fetched successfully"
      )
    );
});

const updateArticles = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const { title, content, place, category } = req.body;

  const article = await Article.findById(articleId);
  if (!article) {
    throw new ApiError(404, "Article does not exists");
  }

  const categoryToBeAdded = await Category.findOne({
    name: category?.trim().toLowerCase(),
  });
  if (!categoryToBeAdded) {
    throw new ApiError(404, "Category does not exists");
  }

  const updateArticles = await Article.findByIdAndUpdate(
    article,
    {
      $set: {
        title,
        content,
        place,
        category: categoryToBeAdded?._id,
      },
    },
    { new: true }
  );
  if (!updateArticles) {
    throw new ApiError(
      500,
      "Failed to update article due to an unexpected server error. Please try again later"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateArticles, "Article update successfully"));
});

const updateImage = asyncHandler(async (req, res) => {
  const { articleId } = req.params;

  const article = await Article.findById(articleId);
  if (!article) {
    throw new ApiError(404, "Article does not exists");
  }

  const localFilePath = req.file?.path;
  if (!localFilePath) {
    throw new ApiError(400, "Image is missing");
  }

  const image = await uploadOnCloudinary(localFilePath, "Neuzy/articles");
  if (!image) {
    throw new ApiError(
      400,
      "Failed to upload image. Please ensure the file format is supported"
    );
  }

  const updateImage = await Article.findByIdAndUpdate(
    articleId,
    {
      $set: {
        image: {
          url: image.url,
          publicId: image.public_id,
        },
      },
    },
    { new: true }
  );
  if (!updateImage) {
    throw new ApiError(
      500,
      "Failed to update image due to an unexpected server error. Please try again later"
    );
  }

  const publicId = article.image.publicId;
  await deleteFromCloudinary(publicId);

  return res
    .status(200)
    .json(new ApiResponse(200, updateImage, "Image update successfully"));
});

const deleteArticle = asyncHandler(async (req, res) => {
  const { articleId } = req.params;

  const article = await Article.findById(articleId);
  if (!article) {
    throw new ApiError(404, "Article does not exists");
  }

  const deleteArticle = await Article.findByIdAndDelete(articleId);
  if (!deleteArticle) {
    throw new ApiError(
      500,
      "Failed to delete article due to an unexpected server error. Please try again later"
    );
  }

  const publicId = article.image.publicId;
  await deleteFromCloudinary(publicId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { deleteArticle }, "Article delete successfully")
    );
});

const assignAccess = asyncHandler(async (req, res) => {
  const { articleAccess } = req.body;
  const { articleId } = req.params;

  if (!articleAccess) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required field to assign access"
    );
  }

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      throw new ApiError(404, "Article does not exists");
    }

    article.articleAccess = articleAccess;
    await article.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Article access change successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to assing access due to an unexpected server error. Please try again later"
    );
  }
});

export {
  getAllArticles,
  createArticles,
  getArticleById,
  getArticleByCategory,
  updateArticles,
  updateImage,
  deleteArticle,
  assignAccess,
};
