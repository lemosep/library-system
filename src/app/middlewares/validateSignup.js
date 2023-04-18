const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;

  //Verify name field

  if (!name) {
    return res
      .status(400)
      .json({ message: "Error : Name is a mandatory field." });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json("Error : Name must have at least 3 characters.");
  }

  //Verify email field

  if (!email) {
    return res
      .status(400)
      .json({ message: "Error : Email is a mandatory field." });
  }

  const regexEmail = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

  if (!regexEmail.test(email)) {
    return res.status(400).json({
      error: "Error: Email type is not valid.",
      message: "Correct format should be email@email.com ",
    });
  }

  //Verify Password field

  if (!password) {
    return res
      .status(400)
      .json({ error: "Error : Password is a mandatory field." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must have at least 6 characters." });
  }

  next();
};

export default validateSignup;
