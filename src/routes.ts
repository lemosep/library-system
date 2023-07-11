import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { validateSignup } from "./app/middlewares/validateSignup";

export const routes = Router();
const prisma = new PrismaClient();

//Controllers
import { User } from "./app/controllers/User";
import { Book } from "./app/controllers/Book";
import { todo } from "node:test";

//Controllers???

// Default pages - (homepage, about, etc...)

// @@TODO - search for html rendering in Typescript

//user, book and user_book

//User
const user: User = new User();
routes.get("/users", user.index);
routes.get("/user/:id", user.search);
routes.get("/login"); /** @todo Add middlewares and search about token */
routes.post("/signup", validateSignup, user.create);
routes.post("/users/books/new", user.newBook);

//Book
const book: Book = new Book();
routes.get("/books", book.index);
routes.get("/book/:name", book.searchBook);
routes.post("/books", book.create);
routes.put("/books", book.updateBook);
