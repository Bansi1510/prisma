import { Request, Response } from "express";
import prisma from "../config/db.config";


export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const isHasEmail = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (isHasEmail) {
      return res.status(400).json({
        message: "email already exist"
      })
    }

    const user = await prisma.user.create({
      data: {
        email, name, password
      }
    })

    return res.status(200).json({
      message: "user created",
      user,
    })
  } catch (error) {
    console.log(error);
    return res.status(502).json({
      message: error
    })
  }
}