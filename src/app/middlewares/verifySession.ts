import { Request, Response, NextFunction } from "express";

import { prisma } from "../../app";

export const verifySession = async (req:Request, res:Response, next:NextFunction) => {
    
    const parsedCookieValue = req.headers.cookie?.replace('user=','');

    if(!parsedCookieValue) {
        return res.redirect('homepage');
    }

    const session = await prisma.session.findFirst({
        where: {
            sessionID: parsedCookieValue,
        }
    });

    if (session) {
        // Add user to res.locals
        const user = await prisma.user.findFirst({
            where: {
                id: session.userId,
            }
        });

        res.locals.user = user;
        next();
        
    } else {
        res.render('error', {value: 401, stringErr: "Unauthorized"})
    }
}