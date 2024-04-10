const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
  if (!userUid) {
    console.log("back");
    return next({
      status: 401,
      message: "please login to view to this page."
    });
  };
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user; // attach that user to the request
  next();
}
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};