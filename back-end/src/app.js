const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const signupRouter = require("./signup/signup.router");
const loginRouter = require("./login/login.router");
const cors = require("cors");
const { restrictToLoggedinUserOnly } = require("./middleware/auth");

// Middleware

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.urlencoded({ extended: false }));

// Routes

app.use("/signup", signupRouter);
app.use("/login", loginRouter);

// Home route
app.use(restrictToLoggedinUserOnly);
app.use("/home", (req, res) => {
  const name = "This is home";
  res.json({ data: name });
});
app.use("/about", (req, res) => {
  const name = "This is about";
  res.json({ data: name });
});

// 404 Error Handling Middleware
app.use((req, res, next) => {
  const error = new Error(`Path not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Error Handling Middleware
app.use((error, req, res, next) => {
  console.log(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
