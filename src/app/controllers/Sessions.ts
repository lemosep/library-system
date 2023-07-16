import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { User } from "./User";

const prisma = new PrismaClient();

export class Sessions {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .render("error", { value: 404, stringErr: "User not found." });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res
        .status(401)
        .render("error", { value: 401, stringErr: "Incorrect password" });
    }

    return res.status(200).json({ msg: "ok" });
  }
}
