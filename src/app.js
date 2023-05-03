import express from "express";
import { ExpressHandlebars } from "express-handlebars";
import { PrismaClient } from "@prisma/client";

import routes from "./routes.js";

const app = express();

app.engine("handlebars", ExpressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const prisma = new PrismaClient();

app.use(express.json());
app.use(routes);

export default app;
