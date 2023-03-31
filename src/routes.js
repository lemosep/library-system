import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const routes = new Router();
const prisma = new PrismaClient();

//Controllers
import user from "./app/controllers/User";

//Controllers???

//user, book and user_book

//User
routes.get("/users", user.index);
routes.get("/users/search/:id", user.search);
routes.post("/signup", user.create);

export default routes;
