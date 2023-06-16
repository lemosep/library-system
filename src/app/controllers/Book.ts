import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Book {
  // Get all books
  async index(req: Request, res: Response) {
    const books = await prisma.book.findMany();
    return res.json(books);
  }
  // Get specific book
  async search(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const book = await prisma.book.findUnique({
      where: { id },
    });

    const status = book ? 200 : 404;

    return res.status(status).json(book);
  }

  //Add new Book
  async add(req: Request, res: Response) {
    const { name, author, pages } = req.body;

    const newBook = await prisma.book.create({
      data: {
        name,
        author,
        pages,
      },
    });

    return res.status(200).json(newBook);
  }
}
