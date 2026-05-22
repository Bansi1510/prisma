import { Router } from "express";
import { createComment, deleteComment, getCommentById, getComments, updateComment } from "../controllers/comment.controller.js";


const commentRouter = Router();

commentRouter.get("/", getComments)
commentRouter.get("/:id", getCommentById)
commentRouter.post("/create", createComment);
commentRouter.put("/update/:id", updateComment)
commentRouter.delete("/:id", deleteComment)


export default commentRouter;