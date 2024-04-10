const { setUser } = require("../service/auth");
const service = require("./login.service");
var jwt = require("jsonwebtoken");


async function login(req, res,next) {
    console.log("login data: ", req.body.data);
    
    const user = await service.read(req.body.data);
    if (!user) {
        next({
            status: 401,
            "message":"invalid email or password."
        })
    }
    
    const token= setUser(user);
    res.cookie("uid", token);
    res.json({ data: user });
}

module.exports = {
  login,
};
