import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "TypeScript Backend Running 🚀",
  });
});


app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});