import { Request, Response, NextFunction } from "express";

export const homepageRender = (req: Request, res: Response) => {
  res.render("homepage");
};
