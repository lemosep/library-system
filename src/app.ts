import express from "express";
import dotenv from 'dotenv';

import { verifySession } from "./app/middlewares/verifySession";
import { routes } from "./routes";

dotenv.config();

export const app = express();

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded());

app.use(verifySession)
app.use(routes);
