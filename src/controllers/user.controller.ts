import { Request, Response } from "express";
import prisma from "../config/db.config.js";

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log("hello")
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
      error,
    });
  }
};