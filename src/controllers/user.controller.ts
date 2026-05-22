import { Request, Response } from "express";
import prisma from "../config/db.config.js";



export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany({
      include: {
        post: {
          select: {
            title: true,
            description: true
          }
        }
      }
    });

    return res.status(200).json({
      message: "get all users",
      data
    })
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const data = await prisma.user.findFirst({
      where: {
        id: Number(userId)
      }
    })

    return res.status(200).json({
      message: "fetch single user",
      data
    })
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
}
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const isHasEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isHasEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(201).json({
      message: "User created",
      user,
    });
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    const updateUser = await prisma.user.update({
      where: {
        id: Number(userId)
      },
      data: {
        name, email, password
      }
    })

    return res.status(200).json({
      message: "user updated",
      user: updateUser
    })
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const data = await prisma.user.delete({
      where: {
        id: Number(userId)
      }
    })

    return res.status(200).json({
      message: "delete single user",
      data
    })
  } catch (error: unknown) {
    console.log("FULL ERROR => ", error);

    return res.status(500).json({
      message: error,
    });
  }
}