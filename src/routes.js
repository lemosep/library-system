import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const routes = new Router();
const prisma = new PrismaClient();

//Controllers
import user from "./app/controllers/User.js";

//Controllers???

//user, book and user_book

//User
routes.get("/users", user.index);
routes.get("/users/:id", user.search);
routes.post("/users", user.create);

export default routes;
