import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.models.js";

const getAllCategory = asyncHandler(async (req, res) => {
  // get all category
  // handle error
  // use helper function
  // send response
});

const createCategory = asyncHandler(async (req, res) => {
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

  const category = await Category.create({
    name,
    owner: req.user._id,
  });
  if (!category) {
    throw new ApiError(
      500,
      "Failed to create category due to an unexpected server error. Please try again later"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
});

const getCategoryById = asyncHandler(async (req, res) => {
  // get category id
  // find category exists or not
  // send response
});

const updateCategory = asyncHandler(async (req, res) => {
  // get input field
  // get category id
  // find category by id
  // set category
  // send response
});

const deleteCatgory = asyncHandler(async (req, res) => {
  // get category id
  // find and delete category
  // send response
});

export { createCategory };
