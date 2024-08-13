const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET; // Your JWT secret key

function verify(req,res,next) {
  const token = req.cookies?.token;
  if (!token) {
    return next({
      status: 401,
      message: "Unauthorized: No token provided",
    });
  }
     jwt.verify(token, secretKey, (err, decoded) => {
       if (err) {
         return next({
           status: 401,
           message: "Unauthorized: Invalid token",
         });
       }

       // If token is valid, return the decoded user info
       res.json({ user: decoded });
     });
}

module.exports = {
    verify
}