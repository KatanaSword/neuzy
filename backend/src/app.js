import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded({ limit: "18kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Import router
import userRouter from "./routers/user.routers.js";
import categoryRouter from "./routers/category.routers.js";
import articleRouter from "./routers/article.routers.js";
import likeRouter from "./routers/like.routers.js";
import subscriptionRouter from "./routers/subscription.routers.js";

// Declear router
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

export { app };
