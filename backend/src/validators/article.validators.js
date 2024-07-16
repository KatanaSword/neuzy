import { body, param } from "express-validator";
import { availableArticle } from "../constants.js";

const articleCreateRequestBodyValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("place").trim().notEmpty().withMessage("City name is required"),
    body("category").trim().notEmpty().withMessage("Category name is required"),
    body("articleAccess")
      .optional()
      .isIn(availableArticle)
      .withMessage("Invalid article access"),
  ];
};

export { articleCreateRequestBodyValidator };
