import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { likeDislikeArticle } from "../controllers/like.controllers.js";

const router = Router();

router.use(verifyJWT);

router.route("/article/:articleId").post(verifyJWT, likeDislikeArticle);

export default router;
