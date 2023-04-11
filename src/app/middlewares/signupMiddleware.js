import { Request, Response, NextFunction } from "express";
import validate from "deep-email-validator";

const signupMiddleware = async (req, res, next) => {
  const { name, email, password } = req.body;

  //Name verifications

  //If name is not null
  if (!name) {
    return res.status(400).json({ error: "Name is a mandatory field." });
  }

  //If name has less than 3 characters
  if (name.length === 3) {
    return res
      .status(400)
      .json({ error: "Name field requires at least 3 characters." });
  }

  //Email Verifications

  //If email is not null
  if (!email) {
    return res.status(400).json({ error: "Email field is mandatory." });
  }

  //Get Email validation info
  const { valid, reason, validators } = await validate(email);

  if (!valid) {
    return res.status(400).json({
      message: "Please provide a valid email address.",
      reason: validators[reason].reason,
    });
  }

  //Password Validation

  //Check if password field is null.
  if (!password) {
    res.send(400).json({ error: "Password is a mandatory field." });
  }

  //Check if password has >= than minimum amount of characters required(6).
  if (password.length < 6) {
    res.send(400).json({ error: "6 character minimum length." });
  }
};

//Email validation external function
