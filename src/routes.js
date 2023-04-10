import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const routes = new Router();
const prisma = new PrismaClient();

//Controllers
import user from "./app/controllers/User.js";
import book from "./app/controllers/Book.js";

//Controllers???

//user, book and user_book

//User
routes.get("/users", user.index);
routes.get("/users/:id", user.search);
routes.post("/users", user.create);
routes.post("users/:id/books/:id/new", user.newBook);

//Book
routes.get("/books", book.index);
routes.get("books/:id", book.search);
routes.post("/books", book.add);

export default routes;
