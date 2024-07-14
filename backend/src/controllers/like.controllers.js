import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Article } from "../models/article.models.js";
import { Like } from "../models/like.models.js";

const likeDislikeArticle = asyncHandler(async (req, res) => {
  const { articleId } = req.params;

  const article = await Article.findById(articleId);
  if (!article) {
    throw new ApiError(404, "Article does not exists");
  }

  const isAlreadyLike = await Like.findOne({
    articleId,
    likedBy: req.user?._id,
  });
  if (isAlreadyLike) {
    await Like.findOneAndDelete({
      articleId,
      likedBy: req.user?._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, { isLiked: false }, "Unliked successfully"));
  } else {
    await Like.create({
      articleId,
      likedBy: req.user?._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, { isLiked: true }, "Liked successfully"));
  }
});

export { likeDislikeArticle };
