import express from "express";
import routes from "./routes";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());
app.use(routes);

export default new app.server();
