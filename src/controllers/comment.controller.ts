import { Request, Response } from "express";
import prisma from "../config/db.config.js";



export const getComments = async (req: Request, res: Response) => {
  try {
    const data = await prisma.comment.findMany({})

    return res.status(200).json({
      message: "get all  comments",
      data
    })
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
}

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.id;

    const data = await prisma.comment.findFirst({
      where: {
        id: Number(commentId)
      }
    })

    return res.status(200).json({
      message: "fetch single  comment",
      data
    })
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
}
export const createComment = async (req: Request, res: Response) => {
  try {

    const { user_id, post_id, comment } = req.body

    await prisma.post.update({
      where: {
        id: Number(post_id)
      },
      data: {
        comment_count: {
          increment: 1
        }
      }
    })

    const newComment = await prisma.comment.create({
      data: {
        user_id: Number(user_id),
        post_id: Number(post_id),
        comment
      }
    })

    return res.status(201).json({
      message: "comment created",
      comment: {
        ...newComment,
        id: newComment.id.toString(),
      },
    });
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
};


export const updateComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.id;
    const { user_id, post_id, comment } = req.body
    const updatedPost = await prisma.comment.update({
      where: {
        id: Number(commentId)
      },
      data: {
        post_id: Number(post_id), comment, user_id: Number(user_id)
      }
    })

    return res.status(200).json({
      message: "comment updated",
      post: updatedPost
    })
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.id;

    const data = await prisma.comment.delete({
      where: {
        id: Number(commentId)
      }
    })
    await prisma.post.update({
      where: {
        id: Number(data.post_id)
      },
      data: {
        comment_count: {
          decrement: 1
        }
      }
    })
    return res.status(200).json({
      message: "delete comment",
      data
    })
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
}