import express, { Express, Request, Response, urlencoded } from "express";
import { PrismaClient, User } from "@prisma/client";
import dotenv from 'dotenv';
import session from "express-session";

import { verifyToken } from "./app/middlewares/verifyToken";
import { routes } from "./routes";

dotenv.config();

export const app: Express = express();

const prisma = new PrismaClient();

app.set("view engine", "pug");
app.set("views", "./src/views");

declare module 'express-session' {
    interface SessionData {
        token:string
    }
}

app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, 
        maxAge: 60000,
    }
}))
// app.use(verifyToken)
app.use(routes);
