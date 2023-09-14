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

   const newSession = await prisma.session.create({
    data: {
      sessionID: randomBytes(32).toString('hex'),
      userId: user.id,
      expiresIn: new Date(Date.now() + 2 * 86400000), // 2 days
    }
   })
   
   //create cookie
   res.cookie("user", newSession.sessionID, {httpOnly: true});
  
   if(user.isAdmin) {
    res.redirect('/adminPage');
   } else {
    res.redirect('/userSpace');
   }

  }catch (error) {
    res.status(500).json({msg: 'Internal server error'})
  }
  }
}
