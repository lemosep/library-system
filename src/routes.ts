import { Router } from "express";
import { z } from 'zod';
import { validateRequest } from "zod-express-middleware";

export const routes = Router();

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

routes.get("/userSpace", (req, res) => {
  res.render("userSpace")
})

routes.get("/userSpace/settings", (req, res) => {
  res.render("settings");
})

routes.get("/userSpace/settings/changeUsername")

//Sessions
const session: Sessions = new Sessions();
routes.post("/login",session.create);
routes.post("/logout", session.delete);

//User
const user: User = new User();
routes.get("/users", user.index);
routes.get("/user/:id", user.search);

routes.post("/signup", validateRequest({
  body: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  })
}), user.create);

routes.post("/users/books/new", user.newBook);

//Book
const book: Book = new Book();
routes.get("/books", book.index);
routes.get("/book/:name", book.searchBook); //@TODO change this to POST route
routes.post("/books", book.create);
routes.put("/books", book.updateBook);
