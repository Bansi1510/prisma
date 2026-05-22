import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "TypeScript Backend Running 🚀",
  });
});

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});