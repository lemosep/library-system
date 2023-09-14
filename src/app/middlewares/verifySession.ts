import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { parse } from "path";

const prisma = new PrismaClient();

export const verifySession =async (req:Request, res:Response, next:NextFunction) => {
    
    const parsedCookieValue = req.headers.cookie?.replace('user=','');

    if(!parsedCookieValue) {
        return res.redirect('home');
    }

    const session = await prisma.session.findFirst({
        where: {
            sessionID: parsedCookieValue
        }
    })

    if(session) {
        next();
    } else {
        res.render('error', {value: 401, stringErr: "Unauthorized"})
    }
}