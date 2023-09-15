import { randomBytes } from "crypto";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

export class Sessions {

  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {return res.status(404).json({msg: "Email and password do not relate"})};

    const matchPassword = bcrypt.compareSync(password, user.password);

    if(!matchPassword) {return res.status(404).json({msg: "Email and password do not relate"})};

    const sessionid = await randomBytes(32).toString('hex');

   const newSession = await prisma.session.create({
    data: {
      sessionID: randomBytes(32).toString('hex'),
      userId: user.id,
      expiresIn: new Date(Date.now() + 2 * 86400000), // 2 days
    }
   })
   
   //create cookie
   res.cookie("user", newSession.sessionID, {httpOnly: true, expires: new Date(Date.now() + 2 * 86400000)});
  
   if(user.isAdmin) {
    res.render('adminPage');
   } else {
    res.render('userSpace', {name: user.name});
   }

  }catch (error) {
    res.status(500).json({msg: 'Internal server error'})
  }
  }

  async delete(req:Request, res: Response) {

    const parsedCurrentCookie = req.headers.cookie?.replace("user=","");

    if (!parsedCurrentCookie) { return res.status(409).json({msg: "Session does not exist"}) };

    res.clearCookie('user');

    await prisma.session.delete({
      where: {
        sessionID: parsedCurrentCookie,
      }
    }) ; 

    res.render('homepage')

  }
}
