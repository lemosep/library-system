import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

//Salt value
const saltRounds = 10;

export class User {
  // Get all users
  async index(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.json(users);
  }

  // Search a single user
  async search(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    const status = user ? 200 : 404;

    return res.status(status).json(user);
  }

  //Create new user
  async create(req: Request, res: Response) {
    const { username, name, email, isAdmin, password } = req.body;

    //Hash password
    const hash = await bcrypt.hash(password, saltRounds);

    // User is new to application, so there's no need to pass books as a parameter

    const signup = await prisma.user.create({
      data: {
        username,
        name,
        email,
        isAdmin,
        password: hash,
      },
    });

    return res.status(200).json(signup);
  }

  // Create new Readlog
  async newBook(req: Request, res: Response) {
    const { userId, bookId } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!user) {
      return res.status(404).json({ error: "Could not find user by given ID" });
    }

    if (!book) {
      return res.status(404).json({ error: "Could not find book by given ID" });
    }

    const addToShelf = await prisma.readLog.create({
      data: {
        status: "INSHELF",
        progress: 0,
        userId: user.id,
        bookId: book.id,
      },
    });

    return res.json(addToShelf);
  }
}
