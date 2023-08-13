import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => { 
    const secretKey = `${process.env.SECRET_KEY}`
    const token = req.session.token;

    if (token) {
        try {
            jwt.verify(token, secretKey);
            next();
        } catch (err) {
            return res.status(401).render('error', {value: 401, stringErr: "Invalid Token."})
        }
    } else {
        return res.status(401).render('error', {value: 401, stringErr: "Access denied"})
    }
}