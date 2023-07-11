import express, { Express, Request, Response, urlencoded } from "express";
import { PrismaClient } from "@prisma/client";

import { routes } from "./routes";

export const app: Express = express();

const prisma = new PrismaClient();

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded());
app.use(routes);
