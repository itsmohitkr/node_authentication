const bcrypt = require("bcrypt");

const service = require("./signup.service");

async function create(req, res, next) {
  const { full_name, email, password } = req.body.data;

  if (full_name === "" || email === "" || password === "") {
    next({
      ststus: 400,
      message: "Kindly fill all the input field.",
    });
  }
  const user = await service.read(email);
  if (user) {
    next({
      status: 400,
      message: "User already exist. try login",
    });
  }

  // hash the password

  let hashedPassword = await bcrypt.hash(password, 10);

  const userData = await service.create(full_name, email, hashedPassword);
  res.status(201).json({ data: userData });
}

module.exports = {
  create,
};
