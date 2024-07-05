import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.models.js";
import { getMongoosePaginationOptions } from "../utils/helpers.js";

const getAllCategories = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const categoryAggregate = await Category.aggregate([{ $match: {} }]);

  if (categoryAggregate.length < 1) {
    throw new ApiError(404, "Category does not exists");
  }

  const categories = await Category.aggregatePaginate(
    categoryAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: { totalDocs: "totalCategories", docs: "categories" },
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, categories, "Categories retrieved successfully")
    );
});

const createCategories = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required field to create category"
    );
  }

  const categoryExists = await Category.findOne({
    $or: [{ name: name.trim().toLowerCase() }],
  });
  if (categoryExists) {
    throw new ApiError(
      409,
      "Category already exists. Please use a different name to create category"
    );
  }

  const createCategory = await Category.create({
    name,
    owner: req.user._id,
  });
  if (!createCategory) {
    throw new ApiError(
      500,
      "Failed to create category due to an unexpected server error. Please try again later"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { category: createCategory },
        "Category created successfully"
      )
    );
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category does not exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetch successfully"));
});

const updateCategories = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  if (!name.trim()) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required field to update category"
    );
  }

  const updateCategory = await Category.findByIdAndUpdate(
    categoryId,
    {
      $set: { name },
    },
    { new: true }
  );
  if (!updateCategory) {
    throw new ApiError(404, "Category does not exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateCategory, "Category update successfully"));
});

const deleteCategory = asyncHandler(async (req, res) => {
  // get category id
  // find and delete category
  // send response
});

export {
  createCategories,
  getAllCategories,
  getCategoryById,
  updateCategories,
};
