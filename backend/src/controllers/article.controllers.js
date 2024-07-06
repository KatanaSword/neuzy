import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Article } from "../models/article.models";
import { Category } from "../models/category.models.js";

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

const createArticles = asyncHandler(async (req, res) => {});

const getArticleById = asyncHandler(async (req, res) => {});

const getAtricleByCategory = asyncHandler(async (req, res) => {});

const updateArticles = asyncHandler(async (req, res) => {});

const deleteArticle = asyncHandler(async (req, res) => {});
