import { Request, Response } from "express";

import { prisma } from "../../app";

export class Book {
  // Get all books
  async index(req: Request, res: Response) {
    const books = await prisma.book.findMany();
    return res.json(books);
  }
  // Get specific book
  async searchBook(req: Request, res: Response) {
    let name: string = req.params.name.toUpperCase();

    if (name.includes("_")) {
      name = name.replace("_", " ");
    }

    const book = await prisma.book.findFirst({
      where: {
        name: name,
      },
    });

    if (!book) {
      return res.status(404).json({ message: "Error: Book not found." });
    } else {
      return res.status(200).render("index", {
        title: book.name,
        author: book.author,
        publisher: book.publisher,
        year: book.year,
        pages: book.pages,
      });
    }
  }

  //Create new Book
  async create(req: Request, res: Response) {
    let { name, author, pages, year, publisher } = req.body;

    name = name.toUpperCase();

    const newBook = await prisma.book.create({
      data: {
        name,
        author,
        pages,
        year,
        publisher,
      },
    });

    return res.status(200).json(newBook);
  }

  //Update book
  async updateBook(req: Request, res: Response) {
    const { id, name, author, pages } = req.body;

    const book = await prisma.book.findUnique({
      where: { id: id },
    });

    if (!book) {
      return res.status(200).json({ error: "Could not find book by given ID" });
    }

    if (name) {
      const updateName = await prisma.book.update({
        where: { id: id },
        data: { name: name },
      });
    }

    if (author) {
      const updateAuthor = await prisma.book.update({
        where: { id: id },
        data: { author: author },
      });
    }

    if (pages) {
      const updatePages = await prisma.book.update({
        where: { id: id },
        data: { pages: pages },
      });
    }

    return res.status(204).json(book);
  }
}
