var jwt = require("jsonwebtoken");
const secretKey = "kds2342@#$@#SDF432"

function setUser(user) {
  const payload = {
    id: user.user_id,
    email:user.email
  };
  return jwt.sign(payload, secretKey); 
}

function getUser(token) {
  return jwt.verify(token, secretKey);
}

module.exports = {
  setUser,
  getUser,
};
