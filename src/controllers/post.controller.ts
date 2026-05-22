import { Request, Response } from "express";
import prisma from "../config/db.config.js";



export const getPosts = async (req: Request, res: Response) => {

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  if (page <= 0) page = 1
  if (limit <= 0 || limit >= 10) limit = 10

  const skip = (page - 1) * limit
  try {
    const data = await prisma.post.findMany({
      skip,
      take: limit,
      include: {
        comments: {
          include: {
            user: true
          }
        }
      }
    })

    const totalPosts = await prisma.post.count();

    const totalPages = Math.ceil(totalPosts / limit)

    return res.status(200).json({
      message: "get all  posts",
      data,
      meta: {
        totalPages, currentPage: page,
        limit
      }
    })
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
}

export const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const data = await prisma.post.findFirst({
      where: {
        id: Number(postId)
      }
    })

    return res.status(200).json({
      message: "fetch single post",
      data
    })
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
}
export const createPost = async (req: Request, res: Response) => {
  try {

    const { title, description, user_id } = req.body

    const post = await prisma.post.create({
      data: {
        title, description, user_id: Number(user_id)
      }
    })

    return res.status(201).json({
      message: "Post created",
      post: {
        ...post,
        id: post.id.toString(),
      },
    });
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
};


export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const { title, description } = req.body
    const updatedPost = await prisma.post.update({
      where: {
        id: Number(postId)
      },
      data: {
        title, description
      }
    })

    return res.status(200).json({
      message: "post updated",
      post: updatedPost
    })
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const data = await prisma.post.delete({
      where: {
        id: Number(postId)
      }
    })

    return res.status(200).json({
      message: "delete post",
      data
    })
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
}