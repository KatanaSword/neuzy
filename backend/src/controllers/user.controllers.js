import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { userRole, userSubscription } from "../constants.js";
import { options } from "../constants.js";
import jwt from "jsonwebtoken";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

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

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Missing or invalid refresh token");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new ApiError(401, "Missing or invalid refresh token");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(
      401,
      "Refresh token mismatch. Please reauthenticate to obtain a new access token"
    );
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await generateRefreshAndAccessToken(user?._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "Tokens refreshed successfully."
      )
    );
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!(currentPassword || newPassword)) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to change password"
    );
  }

  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(currentPassword);
  if (!isPasswordValid) {
    throw new ApiError(
      400,
      "Invalid password. Please enter the correct password and try again"
    );
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password change successfully"));
});

const accountDetailUpdate = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email } = req.body;

  const uniqueUsernameAndEmail = await User.findOne({
    $or: [
      { username: username?.trim().toLowerCase() },
      { email: email?.trim().toLowerCase() },
    ],
  });

  if (uniqueUsernameAndEmail) {
    throw new ApiError(
      409,
      "The username or email already exists. Please use a different username and email to account update"
    );
  }

  const updateAccount = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        firstName,
        lastName,
        username: username?.toLowerCase(),
        email,
      },
    },
    { new: true }
  ).select("-password -refreshToken");
  if (!updateAccount) {
    throw new ApiError(
      500,
      "Failed to create product due to an unexpected server error. Please try again later"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateAccount, "Account update successfully"));
});

export {
  registerUser,
  logInUser,
  logOutUser,
  getCurrentUser,
  refreshAccessToken,
  changePassword,
  accountDetailUpdate,
};
