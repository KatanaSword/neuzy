import { Router } from "express";
import {
  accountDetailUpdate,
  changePassword,
  forgotPassword,
  getCurrentUser,
  logInUser,
  logOutUser,
  refreshAccessToken,
  registerUser,
  uploadAvatar,
  resetPassword,
  verifyUserEmailId,
  verifyEmail,
  resendVerifyEmailRequest,
  assignRole,
} from "../controllers/user.controllers.js";
import {
  verifyJWT,
  verifyPermission,
} from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { userRole } from "../constants.js";

const router = Router();

// Unsecure routes
router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:resetToken").post(resetPassword);
router.route("/verify-email/:verificationToken").get(verifyEmail);

// Secure routes
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/verify-email").post(verifyJWT, verifyUserEmailId);
router
  .route("/resend-email-verification")
  .post(verifyJWT, resendVerifyEmailRequest);
router.route("/change-password").patch(verifyJWT, changePassword);
router.route("/account-update").patch(verifyJWT, accountDetailUpdate);
router
  .route("/upload-avatar")
  .patch(verifyJWT, upload.single("avatar"), uploadAvatar);
/* router
  .route("/assign-role/:userId")
  .post(verifyJWT, verifyPermission([userRole.ADMIN]), assignRole); */

export default router;
