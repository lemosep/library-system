import express from "express";

import { verifySession } from "./app/middlewares/verifySession";
import { routes } from "./routes";

export const app = express();

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded());

app.use('/userSpace',verifySession)

app.use(routes);
