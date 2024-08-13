const bcrypt = require("bcrypt");

const { setUser } = require("../service/auth");
const service = require("./login.service");

async function login(req, res, next) {
  const { email, password } = req.body.data;

  if (email === "" || password === "") {
    return next({
      status: 4001,
      message: "Missing input field.",
    });
  }

  const user = await service.read(email);

  if (!user) {
    return next({
      status: 401,
      message: "Please register yourself.",
    });
  }  
  if (user && (await bcrypt.compare(password, user.password)) === false) {
    return next({
      status: 401,
      message: "Incorrect password",
    });
  }

  const token = setUser(user);
  res.cookie("token", token);
  console.log(`user: ${user.full_name} logged in`);
  
  res.json({ data: user });
}

module.exports = {
  login,
};
