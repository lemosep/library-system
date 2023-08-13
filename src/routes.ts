import { Router } from "express";
import { PrismaClient } from "@prisma/client";

//Middlewares
import { verifyToken } from "./app/middlewares/verifyToken";
import { validateSignup } from "./app/middlewares/validateSignup";

export const routes = Router();
const prisma = new PrismaClient();

//Controllers
import { User } from "./app/controllers/User";
import { Book } from "./app/controllers/Book";
import { Sessions } from "./app/controllers/Sessions";

//Controllers???

// Default pages - (homepage, about, etc...)
routes.get("/homepage", (req, res) => {
  res.render("homepage");
});

routes.get("/signup", (req, res) => {
  res.render("signup");
});

routes.get("/login", (req, res) => {
  res.render('login');
})

routes.get("/userSpace",verifyToken ,(req, res) => {
  res.render("userSpace")
})

routes.get("/protected", verifyToken, (req,res) => {
  return res.status(200).json({msg: 'cool af bro'})
})


//Sessions
const session: Sessions = new Sessions();
routes.post("/login", session.create);

//User
const user: User = new User();
routes.get("/users", user.index);
routes.get("/user/:id", user.search);
routes.post("/signup", validateSignup, user.create);
routes.post("/users/books/new", user.newBook);

//Book
const book: Book = new Book();
routes.get("/books", book.index);
routes.get("/book/:name", book.searchBook); //@TODO change this to POST route
routes.post("/books", book.create);
routes.put("/books", book.updateBook);
