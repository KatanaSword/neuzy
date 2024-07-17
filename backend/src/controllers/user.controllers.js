import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { userRole } from "../constants.js";
import { options } from "../constants.js";
import jwt from "jsonwebtoken";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import {
  sendEmail,
  forgotPasswordMailgenContent,
  verifyEmailMailgenContent,
} from "../utils/mail.js";
import crypto from "crypto";

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
  const { username, email, role, password } = req.body;
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to sign up"
    );
  }

  const userExist = await User.findOne({
    $or: [
      { username: username.trim().toLowerCase() },
      { email: email.trim().toLowerCase() },
    ],
  });
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
  if (!email?.trim() && !username?.trim()) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out all required fields to log in."
    );
  }

  const user = await User.findOne({
    $or: [
      { email: email?.trim().toLowerCase() },
      { username: username?.trim().toLowerCase() },
    ],
  });
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

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const updateAccount = await User.findByIdAndUpdate(
    user._id,
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

  if (email) {
    user.isEmailVerified = false;
    await user.save({ validateBeforeSave: false });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateAccount, "Account update successfully"));
});

const uploadAvatar = asyncHandler(async (req, res) => {
  const localFilePath = req.file?.path;
  if (!localFilePath) {
    throw new ApiError(400, "Avatar is missing");
  }

  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const avatar = await uploadOnCloudinary(localFilePath, "neuzy/users");
  if (!avatar) {
    throw new ApiError(
      400,
      "Failed to upload avatar. Please ensure the file format is supported"
    );
  }

  const uploadAvatar = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        avatar: { url: avatar.url, publicId: avatar.public_id },
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  const publicId = user.avatar.publicId;
  await deleteFromCloudinary(publicId);

  return res
    .status(200)
    .json(new ApiResponse(200, uploadAvatar, "Avatar upload successfully"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email.trim()) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required field to forgot password"
    );
  }

  const user = await User.findOne({
    $or: [{ email: email?.trim().toLowerCase() }],
  });
  if (!user) {
    throw new ApiError(404, "User does not exist", []);
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user?.generateTemporaryToken();
  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  sendEmail({
    email: user.email,
    subject: "Password reset request",
    mailgenContent: forgotPasswordMailgenContent(
      user.username,
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset email sent on your email Id. Please check your inbox for further instructions"
      )
    );
});

const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { resetPassword } = req.body;

  if (!resetPassword) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required field to reset password"
    );
  }

  let hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({ forgotPasswordToken: hashedToken });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  user.password = resetPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Reset password successfully"));
});

const verifyUserEmailId = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email.trim()) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required field to verify email"
    );
  }

  const user = await User.findOne({
    $or: [{ email: email.trim().toLowerCase() }],
  });
  if (!user) {
    throw new ApiError(404, "User does not exist", []);
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: "Verify email id",
    mailgenContent: verifyEmailMailgenContent(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Email sent on your email Id. Please check your inbox for further instructions"
      )
    );
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  if (!verificationToken) {
    throw new ApiError(400, "Email verification token is missing");
  }

  let hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });
  if (!user) {
    throw new ApiError(489, "Token is missing or expire");
  }

  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;

  user.isEmailVerified = true;
  await save.user({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, { isEmailVerified: true }, "Email is verified"));
});

const resendVerifyEmailRequest = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User does not exists", []);
  }

  if (user.isEmailVerified) {
    throw new ApiError(409, "Email is already verified!");
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user.email,
    subject: "Verify email id",
    mailgenContent: verifyEmailMailgenContent(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Email sent on your email Id. Please check your inbox for further instructions"
      )
    );
});

const assignRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const { userId } = req.params;
  if (!role.trim()) {
    throw new ApiError(
      400,
      "Missing or incomplete information. Please fill out required field to assign role"
    );
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User does not exists");
    }

    user.role = role;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Role change successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      "Assign role failed due to an unexpected server error. Please try again later."
    );
  }
});

export {
  registerUser,
  logInUser,
  logOutUser,
  getCurrentUser,
  refreshAccessToken,
  changePassword,
  accountDetailUpdate,
  uploadAvatar,
  forgotPassword,
  resetPassword,
  verifyUserEmailId,
  verifyEmail,
  resendVerifyEmailRequest,
  assignRole,
};
