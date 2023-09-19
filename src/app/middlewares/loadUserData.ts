import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loadUserData = async (req: Request, res: Response, next: NextFunction) => {
    
    const parsedCurrentCookie = req.headers.cookie?.replace("user=","");

    if(!parsedCurrentCookie) {
        res.render('homepage')
    }

    const currentSession = await prisma.session.findFirst({
        where: {
            sessionID: parsedCurrentCookie,
        }
    });

    const user = await prisma.user.findFirst({
        where: {
            id: currentSession?.userId,
        }
    });

    

}