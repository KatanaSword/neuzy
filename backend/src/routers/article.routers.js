import { Router } from "express";
import {
  assignAccess,
  createArticles,
  deleteArticle,
  getAllArticles,
  getArticleByCategory,
  getArticleById,
  updateArticles,
  updateImage,
} from "../controllers/article.controllers.js";
import {
  verifyJWT,
  verifyPermission,
} from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { userRole } from "../constants.js";

const router = Router();

router
  .route("/")
  .get(getAllArticles)
  .post(verifyJWT, upload.single("image"), createArticles);
router
  .route("/:articleId")
  .get(getArticleById)
  .patch(verifyJWT, updateArticles)
  .delete(verifyJWT, deleteArticle);
router
  .route("/update-image/:articleId")
  .patch(verifyJWT, upload.single("image"), updateImage);
/* router
  .route("/assign-access/:articleId")
  .post(verifyJWT, verifyPermission([userRole.ADMIN]), assignAccess); */
router.route("/category/:categoryId").get(getArticleByCategory);

export default router;
