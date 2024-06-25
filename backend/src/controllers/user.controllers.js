import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { userRole, userSubscription } from "../constants.js";
import { options } from "../constants.js";

const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating the access token."
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, role, subscription, password } = req.body;
  if (
    [username, email, role, subscription, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to sign up"
    );
  }

  const userExist = await User.findOne({ $or: [{ username }, { email }] });
  if (userExist) {
    throw new ApiError(
      409,
      "The user account already exists. Please use a different username and email to sign up"
    );
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    role: role || userRole.USER,
    subscription: subscription || userSubscription.FREE,
    password,
  });
  if (!user) {
    throw new ApiError(
      500,
      "Registration failed due to an unexpected server error. Please try again later"
    );
  }

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createUser) {
    throw new ApiError(404, "User does not exist");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createUser },
        "Account created successfully. Welcome aboard!"
      )
    );
});

const logInUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!email && !username) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to log in."
    );
  }

  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(
      400,
      "Invalid password. Please enter the correct password and try again"
    );
  }

  const { refreshToken, accessToken } = await generateRefreshAndAccessToken(
    user?._id
  );

  const loggedInUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );
  if (!loggedInUser) {
    throw new ApiError(
      500,
      "Log in failed due to an unexpected server error. Please try again later"
    );
  }

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, refreshToken, accessToken },
        "Login successful. Welcome back!"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user?._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .json(new ApiResponse(200, {}, "Logout successful. Have a great day!"));
  } catch (error) {
    throw new ApiError(
      500,
      "Log out failed due to an unexpected server error, Please try again later"
    );
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          req.user,
          "Current user details retrieved successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to retrieved current user due to an unexpected server error. Please try again later"
    );
  }
});

export { registerUser, logInUser, logOutUser, getCurrentUser };
