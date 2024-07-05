import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  createCategories,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategories,
} from "../controllers/category.controllers.js";

const router = Router();

router.route("/").get(getAllCategories).post(verifyJWT, createCategories);
router
  .route("/:categoryId")
  .get(getCategoryById)
  .patch(verifyJWT, updateCategories)
  .delete(verifyJWT, deleteCategory);

export default router;
