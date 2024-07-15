import { body, param } from "express-validator";
import { availableUserRole } from "../constants.js";

const userRegisterValidators = () => {
  return [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at lease 3 characters long"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("role")
      .optional()
      .isIn(availableUserRole)
      .withMessage("Invalid user role"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        "password must be at least 8 characters long, with at least one number and one special symbol"
      ),
  ];
};

const UserLogInValidators = () => {
  return [
    body("email").optional.isEmail().withMessage("Email is invalid"),
    body("username").optional(),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

const userChangeCurrentPasswordValidators = () => {
  return [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .notEmpty()
      .withMessage("New password is required")
      .isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        "password must be at least 8 characters long, with at least one number and one special symbol"
      ),
  ];
};

export {
  userRegisterValidators,
  UserLogInValidators,
  userChangeCurrentPasswordValidators,
};
