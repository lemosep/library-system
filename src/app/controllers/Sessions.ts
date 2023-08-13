import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = `${process.env.SECRET_KEY}`;

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

    // If email and password are accordingly, generate session 
    const token = jwt.sign({userId: user.id}, secretKey, {expiresIn: "1min"})

   await prisma.user.update({ 
    where: {id: user.id},
    data: {token: token}
   });
   
   req.session.token = token;

   res.status(200).redirect("userSpace");

  }catch (error) {
    res.status(500).json({msg: 'Internal server error'})
  }
  }
}
