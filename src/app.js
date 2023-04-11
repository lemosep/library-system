import express from "express";
import { PrismaClient } from "@prisma/client";

import routes from "./routes.js";
import auth from "./auth/auth.js";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(routes);

export default app;
