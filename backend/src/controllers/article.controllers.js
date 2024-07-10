import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Article } from "../models/article.models.js";
import { Category } from "../models/category.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { getMongoosePaginationOptions } from "../utils/helpers.js";

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
  const { title, content, place, category } = req.body;
  if ([title, content, place, category].some((field) => field?.trim() === "")) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to create article"
    );
  }

  const categoryExists = await Category.findOne({
    category: category.name?.trim().toLowerCase(),
  });
  if (!categoryExists) {
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
    category: categoryExists._id,
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

const getArticleByCategory = asyncHandler(async (req, res) => {});

const updateArticles = asyncHandler(async (req, res) => {});

const deleteArticle = asyncHandler(async (req, res) => {});

export {
  getAllArticles,
  createArticles,
  getArticleById,
  getArticleByCategory,
  updateArticles,
  deleteArticle,
};
