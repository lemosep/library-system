import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { routes } from "./routes";

export const app: Express = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(routes);
